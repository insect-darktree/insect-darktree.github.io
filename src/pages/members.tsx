import React from 'react';
import Layout from '@theme/Layout';
import styles from './members.module.css';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

// List of current core team
const DarkTreeTeam = [
  {
    name: (<a href="https://www.thetangledlines.de/ela/#section0">Ela Iwaszkiewicz-Eggebrecht</a>),
    image: 'img/Ela_I_E_lab.jpg',
    title: (<>Research Manager </>),
    description: (<> Ela oversees the implementation of the DarkTree project, managing logistics, administration and labwork. Beyond DarkTree, she leads the Swedish Insect Monitoring Scheme, applying DNA metabarcoding 
    to track biodiversity. Ela holds a PhD in Evolutionary Biology from the Max Planck Institute (Germany) and an MSc in Oceanography from Sorbonne University (France).  
    [contact: ela.iwaszkiewicz@nrm.se]
    </>),
  },
  {
    name: (<a href="https://www.stationlinne.se/sv/about/personal/">Mårten Klinth</a>),
    image: 'img/MartenKlinth.jpg',
    title: (<>Lab Specialist </>),
    description: (<> Mårten received the PhD degree from the Norwegian University of Science and Technology, Norway, in 2025. 
    He focuses on DNA barcoding of insects (both individual specimens and bulk samples) and is in charge of the DNA lab 
    at Station Linné on Öland. He also works with Ela in the Swedish Insect Monitoring Scheme. [contact: marten@stationlinne.se]
    </>),
  },
  {
    name: (<a href="https://liu.se/en/employee/maeca40">Maeva Caut</a>),
    image: 'img/MaevaCaut.jpg',
    title: (<>PhD student </>),
    description: (<> Maeva is a PhD student at Linköping University in the Computer Vision and Learning System Laboratory under 
    the supervision of Pr. Michael Felsberg. Her research focuses on developing machine learning models for insect biodiversity, 
    particularly species classification through the integration of images, DNA barcodes, and taxonomic labels.
    </>),
  },
  {
    name: (<a href="https://www.samanthalc.com/">Samantha Lopez Clinton</a>),
    image: 'img/Samantha_Lopez_Clinton.jpg',
    title: (<>PhD student </>),
    description: (<> Samantha is a PhD student in the Data-Driven Life Science (DDLS) programme at the Swedish Museum of Natural History, 
    Stockholm University, and the Centre for Palaeogenetics, working in the research group led by Tom. As part of her dissertation, 
    and in collaboration with Fredrik and Ela, she has worked on bulkDNA shotgun sequencing data from Malaise trap samples collected by 
    the Insect Biome Atlas project. In DarkTree, Samantha works with Claudia to establish the de-novo genome assembly pipeline 
    for insect shotgun sequencing data.
    </>),
  },
  {
    name: (<a href="https://ronquistlab.github.io/people.html#claudia">Claudia Weber </a>),
    image: 'img/ClaudiaWeber.jpg',
    title: (<>Researcher </>),
    description: (<>Claudia is a researcher at the Swedish Museum of Natural History, and is responsible for assembling the DarkTree genomes 
    (with help from Sam). She completed her MBiol in Biology and PhD on genome structure and determinants of rates of evolution 
    at the University of Bath (UK), and has extensive experience working with models of molecular evolution. Recent work has also involved 
    using machine learning to screen insect sequencing data for microbial contaminants, and to facilitate the assembly of genomes from undersampled taxa.
    </>),
  },
  {
    name: (<a href="">Viktor Palmqvist </a>),
    image: 'img/',
    title: (<>Reasearcher </>),
    description: (<> Viktor ...</>),
  },
  {
    name: (<a href="https://ronquistlab.github.io/people.html#tim">Thimothée Virgoulay</a>),
    image: 'img/timv.jpg',
    title: (<>Researcher</>),
    description: (<>Tim obtained a PhD in population genetics at Montpellier University 
    developing inference tools for a specific class of demo-genetics models (isolation by distance).
    His research focus is currently implementing and testing inference algorithms (such as MCMC/SMC) 
    and developing phylogenetics models in a probabilistic programming language setting, 
    using the Miking framework and TreePPL, a domain-specific probabilistic programming language 
    for phylogenetics. He is also helping on side-projects as R package developer, 
    web vibe coder, data analyst, kid's clown, dog-walker and I also make a excellent risotto 
    (at least nobody have ever complain about).</>),
  },
  {
    name: (<a href="https://ronquistlab.github.io/people.html">Fredrik Ronquist</a>),
    image: '/img/fredrik.jpg',
    title: (<>Principal Investigator </>),
    description: (<>Fredrik is a Professor of Entomology at the Swedish Museum of Natural History, 
    previously Professor of Systematic Biology at Uppsala University and Computational Science at 
    Florida State University. He has a long track record of research in statistical phylogenetics, 
    generating some of the most widely used software for probabilistic inference in phylogeny and evolution. 
    He also has a long-standing interest in insect diversity and evolution, including automated image-based 
    identification, and leading the Insect Biome Atlas project.</>),
  },
  {
    name: (<a href="https://liu.se/en/employee/micfe03">Michael Felsberg </a>),
    image: '/img/M_Felsberg.jpg',
    title: (<>Principal Investigator </>),
    description: (<>Michale received the PhD degree from Kiel University, Germany, in 2002, and the docent degree 
    from Linköping University, in 2005. He is a full professor at Linköping University, Sweden. His research interests include, 
    besides visual object tracking, video object and instance segmentation, classification, segmentation, and registration of point clouds, 
    as well as efficient machine learning techniques for incremental, few-shot, and long-tailed settings.</>),
  },
  {
    name: (<a href="https://people.kth.se/~dbro/">David Broman</a>),
    image: 'img/david2021.jpg',
    title: (<>Principal Investigator </>),
    description: (<> David received his Ph.D. from Linköping University in 2010 and a docent degree from KTH Royal
Institute of Technology in 2015. He is currently a full professor at KTH and a visiting professor at Stanford University
in California, USA. Between 2012 and 2014, he was a visiting scholar at the University of California, Berkeley, where he 
also was employed as a part-time researcher until 2016. David’s research focuses on the intersection of probabilistic machine 
learning, domain-specific languages, and compilers, typically applied to areas where computational efficiency matters, 
including phylogenetics and cyber-physical systems.</>),
  },
  {
    name: (<a href="https://palaeogenetics.com/tom-van-der-valk/">Tom van der Valk</a>),
    image: 'img/Tom_vd_Valk.jpg',
    title: (<>Principal Investigator </>),
    description: (<> Tom is a Data-Driven Life Science Fellow at the Swedish Museum of Natural History.
His research has focused on population genomics and palaeogenomics of vertebrates, and he has extensive experience in using 
challenging biological material for genome sequencing and assembly. Tom has among others been involved in the de-novo genome 
assembly of Spruce and Pine, among the most challenging genomes assembled to date. His group is also developing large-scale 
computational methods for the analysis of environmental DNA samples, including Malaise trap samples.</>),
  }, 
  {
    name: (<a href="https://www.stationlinne.se/sv/about/personal/">Dave Karlsson</a>),
    image: 'img/Dave_K.jpg',
    title: (<>Principal Investigator </>),
    description: (<> Dave is a Researcher (Doctor in Systematic Zoology) and Managing Director of Station Linné. 
    Taxonomist and naturalist whose research focuses on insect diversity, with a particular emphasis on Hymenoptera (especially Braconidae) 
    and (macro)Lepidoptera. He is deeply involved in education and outreach and has a strong passion for natural history education.</>),
  } 
];

// List of Former Members
// Appear in order
const FormerMembers = [
  {
    name: (<a href="https://www.kth.se/profile/caylak">Gizem Çaylak </a>),
    image: 'img/caylak.jpg',
    title: (<>PhD student </>),
    description: (<>Gizem is a PhD student at KTH Royal Institute of Technology. Her research focuses on developing methods for improving inference 
    in probabilistic programming languages, with applications to phylogenetic studies.</>),
  },
];

// List of Scientific Advisory Board
const ScientificAdvis= [
  {
    name: (<a href="https://www.extavourlab.com/people/cassandra-g-extavour/">Cassandra G. Extavour </a>),
    image: 'img/C_Extavour.jpg',
    //title: (<>Professor</>),
    description: (<>Howard Hughes Medical Institute Investigator; Timken Professor of Organismic and Evolutionary Biology and of Molecular and Cellular Biology; Harvard College Professor</>),
  },
  {
    name: (<a href="https://www.extavourlab.com/people/cassandra-g-extavour/">Rudolf Meier </a>),
    image: 'img/r_meier.jpg',
    //title: (<>Professor</>),
    description: (<>Professor for integrative Biodiversity Discovery at the Natural History Museum in Berlin.</>),
  },
  {
    name: (<a href="https://www.museumfuernaturkunde.berlin/en/about/team/bonnie.blaimer">Bonnie Blaimer </a>),
    image: 'img/B_Blaimer.jpeg',
    //title: (<>Researcher</>),
    description: (<>Scientific Head of the Hymenoptera collection at the Natural History Museum in Berlin. </>),
  },
  {
    name: (<a href="https://symbio.eko.uj.edu.pl/en_GB/staff/piotr-lukasik">Piotr Łukasik </a>),
    image: 'img/Piotr_pic.jpg',
    //title: (<>Associated Professor</>),
    description: (<>Associated Professor at Jagiellonian Univbersity in Kraków.</>),
  },
  {
    name: (<a href="https://internt.slu.se/en/cv-originals/tomas-roslin/">Tomas Roslin </a>),
    image: 'img/tomas-roslin.jpg',
    //title: (<>Professor</>),
    description: (<>Professor of insect ecology at the Department of Ecology, Swedish University of Agricultural Sciences (SLU, Uppsala) and Professor of Ecosystems and Environment Research Programme, University of Helsinki, Finland.</>),
  },
  {
    name: (<a href="https://www.su.se/english/profiles/a/atack">Ayco Tack </a>),
    image: 'img/Ayco_Tack.jpg',
    //title: (<>Professor</>),
    description: (<>Professor at the Department of Ecology, Environment and Plant Sciences at Stockholm University.</>),
  },
];

// List of Collaborators
const Collaborators = [
  {
    name: (<a href="https://">Tilia Häggström </a>),
    image: 'img/Tilia_Haggstrom.jpg',
    title: (<>MSc student</>),
    description: (<>Tilia is a MSc student at Uppsala University with a BSc in molecular biology from Uppsala university. Her BSc thesis was on gallmidges (Cecidomyiidae), which will also be the topic of her MSc thesis. She focuses on combining molecular and morphological characters for identification of mycophagous Cecidomyiidae and their phylogenetic relatinships.</>),
  },
  {
    name: (<a href="https://">Fabian Lundell </a>),
    image: 'img/FabianLundell.jpg',
    title: (<>MSc student</>),
    description: (<>Fabian is a MSc student at Uppsala University who specializes in braconid wasps (Family Braconidae) 
    which was the focus of his BSc thesis. He also does braconid research at Station Linné together with Dave Karlsson and Mårten Klinth.</>),
  },
  {
    name: (<a href="https://">Cristina Lupaşcu-Vasilița</a>),
    image: 'img/Vasilita.jpg',
    title: (<>Researcher</>),
    description: (<>Doctoral candidate and GBOL Project Manager at the Natural History Museum in Stuttgart. Researcher at the Karsruhe Institue of Technology focusing on CT-scanning of insect specimens. </>),
  },
  {
    name: (<a href="https://www.ips.kit.edu/2890_5177.php">Thomas van de Kamp</a>),
    image: 'img/Kamp.jpg',
    title: (<>Researcher</>),
    description: (<>Head of the IPS/LAS BioLab at Karlsruhe Institute of Technology. PI for morphological imaging in life sciences. Coordinator for the research topic “Building Blocks of Life” within the Helmholtz program “From Matter to Materials and Life”.</>),
  },
  {
    name: (<a href="">Want to get Involved?</a>),
    //image: 'img/',
    //title: (<></>),
    description: (<>We are welcoming collaborations! If you want to get involved with the DarkTree project go to <a href="https://insect-darktree.github.io/involved/get_involved">this page</a> to read more.</>),
  },
];

// --- Person card ---
function Person({name, title, image, description}) {
return (
    <div className={clsx('col col--6', styles.personContainer)}>       
      <div style={{ display: 'flex', alignItems: 'start', gap: '20px' }}>
        {/* Image section */}
        <div className={styles.imageWrapper} style={{ flexShrink: 0 }}>
          <img 
            className={styles.personSvg} 
            alt={String(name)} 
            src={useBaseUrl(image)} 
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
          />
        </div>
        {/* Texte Section */}
        <div className="text--left">
          <h3 style={{ margin: 0 }}>{name}</h3>
          <p className={styles.title} style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {title}
          </p>
          <p className={styles.descriptionText}>
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}

// --- Section renderer (shows just a heading if empty) ---
function PeopleSection({id, title, people}) {
  return (
    <section id={id} className={styles.persons}>
      <div className="container">
        <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>{title}</h2>
        {people && people.length > 0 && (
          <div className="row">
            {people.map((p, i) => <Person key={`${id}-${i}`} {...p} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ContributorsPage() {
  return (
    <Layout title="Contributors" description="Contributors">
      <div>
        <PeopleSection
          id="current-team"
          title="DarkTree Team"
          people={DarkTreeTeam}
        />        
        <PeopleSection
          id="former-members"
          title="Former members"
          people={FormerMembers}
        />        
        <PeopleSection
          id="scientific-advisors"
          title="Scientific Advisory Board"
          people={ScientificAdvis}
        />
        <PeopleSection
          id="collaborators"
          title="Collaborators"
          people={Collaborators}
    //    />
    //    <PeopleSection
    //      id="how-to-become-a-contributor"
    //      title="How to become a contributor"
     //     people={[]}
        />
      </div>
    </Layout>
  );
}
