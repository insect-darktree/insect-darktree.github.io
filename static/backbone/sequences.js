/**
 * Sequences Module
 *
 * Handles fetching and displaying barcode sequences from partitioned JSONL files.
 * Includes caching, progress callbacks, and the SequencesModal component.
 */

// Sequence data cache (partitioned by hash prefix)
const sequenceCache = {};  // { partition: { barcodeId: {id, desc, seq} } }
const loadingPartitions = {};  // { partition: Promise }
let loadProgressCallbacks = [];

/**
 * Subscribe to load progress updates
 * @param {Function} callback - Callback function(status)
 * @returns {Function} Unsubscribe function
 */
export function onLoadProgress(callback) {
  loadProgressCallbacks.push(callback);
  return () => {
    loadProgressCallbacks = loadProgressCallbacks.filter(cb => cb !== callback);
  };
}

/**
 * Notify all progress subscribers
 * @param {Object} status - Progress status object
 */
function notifyProgress(status) {
  loadProgressCallbacks.forEach(cb => cb(status));
}

/**
 * Load a single partition file
 * @param {string} partitionKey - Single hex character (0-9, a-f)
 * @returns {Promise<Object>} Partition data { barcodeId: {id, desc, seq} }
 */
async function loadPartition(partitionKey) {
  // Return cached data if available
  if (sequenceCache[partitionKey]) {
    return sequenceCache[partitionKey];
  }

  // Return existing promise if already loading
  if (loadingPartitions[partitionKey]) {
    return loadingPartitions[partitionKey];
  }

  // Start loading
  loadingPartitions[partitionKey] = (async () => {
    const url = `sequences/sequences_${partitionKey}.jsonl.gz`;
    console.log(`Loading partition: ${url}`);
    notifyProgress({ status: 'loading', partition: partitionKey });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }

    // Decompress gzip using DecompressionStream (modern browsers)
    let text;
    if (typeof DecompressionStream !== 'undefined') {
      const ds = new DecompressionStream('gzip');
      const decompressedStream = response.body.pipeThrough(ds);
      const reader = decompressedStream.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const decoder = new TextDecoder();
      text = chunks.map(chunk => decoder.decode(chunk, { stream: true })).join('');
    } else {
      // Fallback: fetch as blob and use pako (would need to add pako library)
      throw new Error('DecompressionStream not supported. Please use a modern browser.');
    }

    // Parse JSONL
    const data = {};
    const lines = text.trim().split('\n');
    for (const line of lines) {
      if (line) {
        const entry = JSON.parse(line);
        data[entry.id] = entry;
      }
    }

    sequenceCache[partitionKey] = data;
    delete loadingPartitions[partitionKey];
    console.log(`Loaded partition ${partitionKey}: ${Object.keys(data).length} sequences`);
    notifyProgress({ status: 'loaded', partition: partitionKey });

    return data;
  })();

  return loadingPartitions[partitionKey];
}

/**
 * Fetch sequences by barcode IDs
 * @param {string[]} barcodeIds - Array of barcode IDs to fetch
 * @returns {Promise<Object[]>} Array of { barcode_id, description, sequence }
 */
export async function fetchSequences(barcodeIds) {
  // Group barcode IDs by partition (first hex char)
  const byPartition = {};
  for (const id of barcodeIds) {
    const partition = id[0].toLowerCase();
    if (!byPartition[partition]) {
      byPartition[partition] = [];
    }
    byPartition[partition].push(id);
  }

  // Load required partitions
  const partitionKeys = Object.keys(byPartition);
  notifyProgress({ status: 'starting', partitions: partitionKeys });

  await Promise.all(partitionKeys.map(key => loadPartition(key)));

  // Collect results
  const results = [];
  for (const id of barcodeIds) {
    const partition = id[0].toLowerCase();
    const entry = sequenceCache[partition]?.[id];
    if (entry) {
      results.push({
        barcode_id: entry.id,
        description: entry.desc,
        sequence: entry.seq
      });
    }
  }

  notifyProgress({ status: 'complete', found: results.length, requested: barcodeIds.length });
  return results;
}

/**
 * Parse semicolon-separated sequence list from metadata
 * @param {string} str - Semicolon-separated sequence entries
 * @returns {string[]} Array of trimmed, non-empty entries
 */
const parseSequenceList = (str) => str?.split(';').map(s => s.trim()).filter(Boolean) || [];

/**
 * Parse a sequence entry string from metadata
 * @param {string} entry - Format: "hash description [source], score, pendant_length"
 * @returns {Object} { hash, score, pendant, fullName }
 */
function parseSequenceEntry(entry) {
  const parts = entry.split(',').map(p => p.trim());
  const pendant = parts.length >= 3 ? parts[parts.length - 1] : null;
  const score = parts.length >= 3 ? parts[parts.length - 2] : (parts.length >= 2 ? parts[parts.length - 1] : null);
  const fullName = parts.slice(0, pendant !== null ? -2 : -1).join(',').trim() || entry;
  const hash = fullName.split(' ')[0];
  return { hash, score, pendant, fullName };
}

/**
 * Create the SequencesModal React component
 * @param {Object} React - React library
 * @returns {Function} SequencesModal component
 */
export function createSequencesModal(React) {
  const { createElement: h, useState, useEffect } = React;

  return function SequencesModal({ node, onClose }) {
    const [selected, setSelected] = useState({});
    const [fetching, setFetching] = useState(false);
    const [fetchedSequences, setFetchedSequences] = useState(null);
    const [error, setError] = useState(null);
    const [loadStatus, setLoadStatus] = useState(null);

    // Subscribe to load progress
    useEffect(() => {
      const unsubscribe = onLoadProgress(status => {
        setLoadStatus(status);
      });
      return unsubscribe;
    }, []);

    if (!node) return null;

    const { metadata, name } = node;
    const allEntries = [
      ...parseSequenceList(metadata.top_sequences),
      ...parseSequenceList(metadata.other_sequences)
    ];
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');

    const totalCount = allEntries.length;
    const selectedCount = Object.values(selected).filter(Boolean).length;

    const toggleSelect = (hash) => {
      setSelected(prev => ({ ...prev, [hash]: !prev[hash] }));
    };

    const selectAll = () => {
      const newSelected = {};
      allEntries.forEach(entry => {
        const { hash } = parseSequenceEntry(entry);
        newSelected[hash] = true;
      });
      setSelected(newSelected);
    };

    const deselectAll = () => {
      setSelected({});
    };

    const handleFetch = async () => {
      const selectedHashes = Object.entries(selected)
        .filter(([_, isSelected]) => isSelected)
        .map(([hash]) => hash);

      if (selectedHashes.length === 0) return;

      setFetching(true);
      setError(null);

      try {
        const sequences = await fetchSequences(selectedHashes);
        setFetchedSequences(sequences);
      } catch (err) {
        console.error('Error fetching sequences:', err);
        setError(err.message || 'Failed to fetch sequences');
      } finally {
        setFetching(false);
      }
    };

    const formatFasta = () => {
      if (!fetchedSequences) return '';
      return fetchedSequences.map(seq =>
        `>${seq.barcode_id} ${seq.description}\n${seq.sequence}`
      ).join('\n\n');
    };

    const copyFasta = () => {
      navigator.clipboard.writeText(formatFasta());
    };

    const downloadFile = (content, filename, mimeType) => {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    };

    const downloadFasta = () => {
      const suffix = fetchedSequences.length < totalCount ? '_selected_barcodes.fasta' : '_barcodes.fasta';
      downloadFile(formatFasta(), `${safeName}${suffix}`, 'text/plain');
    };

    const downloadTsv = () => {
      const header = 'barcode_id\tdescription\tscore\tpendant_length';
      const rows = allEntries.map(entry => {
        const { hash, score, pendant, fullName } = parseSequenceEntry(entry);
        return `${hash}\t${fullName.substring(hash.length).trim()}\t${score || ''}\t${pendant || ''}`;
      });
      downloadFile([header, ...rows].join('\n'), `${safeName}_barcodes.tsv`, 'text/tab-separated-values');
    };

    // Render a sequence list item
    const renderSequenceItem = (entry, keyPrefix, i) => {
      const { hash, score, pendant, fullName } = parseSequenceEntry(entry);
      return h('li', { key: `${keyPrefix}-${i}`, className: 'sequences-modal-item' },
        h('input', {
          type: 'checkbox',
          checked: !!selected[hash],
          onChange: () => toggleSelect(hash)
        }),
        h('span', { className: 'sequences-modal-item-info', title: fullName }, fullName),
        score && h('span', { className: 'sequences-modal-item-score' }, score),
        pendant && h('span', { className: 'sequences-modal-item-pendant' }, pendant)
      );
    };

    return h('div', {
      className: 'sequences-modal-backdrop',
      onClick: (e) => { if (e.target === e.currentTarget) onClose(); }
    },
      h('div', { className: 'sequences-modal' },
        h('div', { className: 'sequences-modal-header' },
          h('h3', null, `Sequences for ${name}`),
          h('button', { className: 'sequences-modal-close', onClick: onClose }, '\u00d7')
        ),
        h('div', { className: 'sequences-modal-content' },
          h('ul', { className: 'sequences-modal-list' },
            allEntries.map((entry, i) => renderSequenceItem(entry, 'seq', i))
          )
        ),
        h('div', { className: 'sequences-modal-actions' },
          h('button', {
            className: 'select-all-btn',
            onClick: selectedCount === totalCount ? deselectAll : selectAll
          }, selectedCount === totalCount ? 'Deselect all' : 'Select all'),
          h('button', {
            className: 'download-tsv-btn',
            onClick: downloadTsv
          }, 'Download TSV'),
          h('button', {
            className: 'fetch-sequences-btn',
            disabled: selectedCount === 0 || fetching,
            onClick: handleFetch
          }, fetching
            ? (loadStatus?.status === 'loading'
                ? `Loading partition ${loadStatus.partition}...`
                : 'Fetching...')
            : `Fetch ${selectedCount} sequence${selectedCount !== 1 ? 's' : ''}`),
          error && h('span', { style: { color: '#d32f2f', fontSize: '12px' } }, error)
        ),
        fetchedSequences && fetchedSequences.length > 0 && h('div', { className: 'sequences-result' },
          h('div', { className: 'sequences-result-header' },
            h('span', { className: 'sequences-result-title' },
              `Fetched ${fetchedSequences.length} sequence${fetchedSequences.length !== 1 ? 's' : ''}`
            ),
            h('div', { className: 'sequences-result-buttons' },
              h('button', { className: 'copy-fasta-btn', onClick: copyFasta }, 'Copy FASTA'),
              h('button', { className: 'download-fasta-btn', onClick: downloadFasta }, 'Download FASTA')
            )
          ),
          h('pre', { className: 'fasta-output' }, formatFasta())
        ),
        h('div', { className: 'sequences-modal-footer' },
          `Total: ${totalCount} sequences`,
          !fetchedSequences && h('span', { style: { marginLeft: '8px', color: '#999' } },
            '(Downloads ~2.5MB per partition as needed)'
          )
        )
      )
    );
  };
}
