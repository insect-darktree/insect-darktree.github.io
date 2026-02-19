/**
 * Placement Count Legend Component
 *
 * Displays a custom color scale legend for placement counts using
 * a logarithmic scale with Paul Tol's Sunset palette.
 */

// Accessible Sunset palette from Bokeh (Paul Tol's scheme)
export const SUNSET_PALETTE = [
  [54, 75, 154],   // #364B9A - deep blue
  [74, 123, 183],  // #4A7BB7
  [110, 166, 205], // #6EA6CD
  [152, 202, 225], // #98CAE1
  [194, 228, 239], // #C2E4EF
  [234, 236, 204], // #EAECCC - pale yellow
  [254, 218, 139], // #FEDA8B
  [253, 179, 102], // #FDB366
  [246, 126, 75],  // #F67E4B
  [221, 61, 45],   // #DD3D2D
  [165, 0, 38]     // #A50026 - deep red
];

/**
 * Calculate log-scale position (0-1) for a value
 * @param {number} value - The value to position
 * @param {number} logMax - Pre-computed Math.log(maxValue + 1)
 * @returns {number} Position from 0 to 1
 */
function logPosition(value, logMax) {
  return Math.log(value + 1) / logMax;
}

/**
 * Get palette color for a log-scaled value
 * @param {number} t - Position from 0 to 1
 * @returns {number[]} RGB color array
 */
function getPaletteColor(t) {
  const idx = Math.min(Math.floor(t * (SUNSET_PALETTE.length - 0.01)), SUNSET_PALETTE.length - 1);
  return SUNSET_PALETTE[idx];
}

/**
 * Toggle Taxonium's default legend (collapse or expand)
 * @param {boolean} shouldCollapse - true to collapse, false to expand
 * @returns {boolean} - true if toggle was successful
 */
function toggleDefaultLegend(shouldCollapse) {
  // Look for elements containing triangle Unicode characters
  // Down triangles indicate expanded state, up triangles indicate collapsed state
  const downTriangles = ['▼', '▾', '▿', '⌄', '˅', '⋁', '∨'];
  const upTriangles = ['▲', '▴', '▵', '⌃', '˄', '⋀', '∧'];
  const targetChars = shouldCollapse ? downTriangles : upTriangles;

  const textWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (textWalker.nextNode()) {
    const text = textWalker.currentNode.textContent;
    if (targetChars.some(char => text.includes(char))) {
      let el = textWalker.currentNode.parentElement;
      if (el.closest('.placement-legend')) continue;

      // Find clickable ancestor
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        if (style.cursor === 'pointer' || el.tagName === 'BUTTON' || el.onclick) {
          console.log(shouldCollapse ? 'Collapsing' : 'Expanding', 'default legend');
          el.click();
          return true;
        }
        el = el.parentElement;
      }
    }
  }

  return false;
}

/**
 * Create the PlacementCountLegend React component
 * @param {Object} React - React library
 * @returns {Function} PlacementCountLegend component
 */
export function createPlacementCountLegend(React) {
  const { createElement: h, useState, useEffect } = React;

  return function PlacementCountLegend({ maxValue, visible }) {
    const [minimized, setMinimized] = useState(false);

    // Collapse/expand Taxonium's default legend based on visibility
    useEffect(() => {
      // Delay to allow Taxonium to render
      const timer = setTimeout(() => {
        if (visible) {
          toggleDefaultLegend(true); // Collapse when our legend is shown
        } else {
          toggleDefaultLegend(false); // Expand when our legend is hidden
        }
      }, 1500);

      return () => clearTimeout(timer);
    }, [visible]);

    if (!visible || maxValue <= 0) return null;

    // Build gradient stops using log scale (matching the actual color mapping)
    const gradientStops = ['rgb(180,180,180) 0%']; // Grey for zero at 0%
    const logMax = Math.log(maxValue + 1);

    // Add stops at key values to show log scale distribution
    const keyValues = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, maxValue]
      .filter(v => v <= maxValue);

    keyValues.forEach(value => {
      const t = logPosition(value, logMax);
      const color = getPaletteColor(t);
      // Position based on log scale, but squeeze into 5-100% range (0-5% is grey for zero)
      const percent = 5 + (t * 95);
      gradientStops.push(`rgb(${color.join(',')}) ${percent.toFixed(1)}%`);
    });

    const gradient = `linear-gradient(to right, ${gradientStops.join(', ')})`;

    // Calculate tick positions for log scale (0, and ~3 intermediate values, plus max)
    const tickValues = [0];
    // Add intermediate ticks at roughly equal log intervals
    const numTicks = 3;
    for (let i = 1; i <= numTicks; i++) {
      const t = i / (numTicks + 1);
      const value = Math.round(Math.exp(t * logMax) - 1);
      if (value > 0 && value < maxValue) {
        tickValues.push(value);
      }
    }
    tickValues.push(maxValue);

    // Helper to calculate percent position for a tick value
    const tickPercent = (value) => value === 0 ? 0 : 5 + (logPosition(value, logMax) * 95);

    return h('div', { className: `placement-legend${minimized ? ' minimized' : ''}` },
      h('div', { className: 'placement-legend-header' },
        h('span', null, 'Placement Count'),
        h('button', {
          className: 'placement-legend-toggle',
          onClick: () => setMinimized(!minimized)
        }, minimized ? 'expand' : 'minimize')
      ),
      h('div', {
        className: 'placement-legend-bar',
        style: { background: gradient }
      }),
      h('div', { className: 'placement-legend-ticks' },
        tickValues.map((value, i) => h('div', {
          key: i,
          className: 'placement-legend-tick-mark',
          style: { left: `${tickPercent(value)}%` }
        }))
      ),
      h('div', { className: 'placement-legend-labels' },
        tickValues.map((value, i) => h('span', {
          key: i,
          className: 'placement-legend-tick',
          style: { left: `${tickPercent(value)}%` }
        }, value.toLocaleString()))
      )
    );
  };
}

/**
 * Generate color mapping for placement counts using log scale
 * @param {number} maxValue - Maximum placement count value
 * @returns {Object} Color mapping object { "0": [r,g,b], "1": [r,g,b], ... }
 */
export function generateColorMapping(maxValue) {
  const colorMapping = {};

  // Grey for zero
  colorMapping["0"] = [180, 180, 180];

  if (maxValue > 0) {
    const logMax = Math.log(maxValue + 1);
    for (let i = 1; i <= maxValue; i++) {
      colorMapping[String(i)] = getPaletteColor(logPosition(i, logMax));
    }
  }

  return colorMapping;
}
