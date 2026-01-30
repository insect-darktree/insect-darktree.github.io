import React from 'react';
import Layout from '@theme/Layout';
import styles from './members.module.css';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

// List of current core team
const DarkTreeTeam = [
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
];

// List of Former Members
// Appear in order
const FormerMembers = [
  {
    name: (<a href="https://">Name</a>),
    image: 'img/dk_logo.jpg',
    title: (<>Title</>),
    description: (<>Description</>),
  },
  {
    name: (<a href="https://">Name</a>),
    image: 'img/dk_logo.jpg',
    title: (<>Title</>),
    description: (<>Description</>),
  },
];

// List of Scientific Advisory Board
const ScientificAdvis= [
  {
    name: (<a href="https://">Name</a>),
    image: 'img/dk_logo.jpg',
    title: (<>Title</>),
    description: (<>Description</>),
  },
];

// List of Collaborators
const Collaborators = [
  {
    name: (<a href="https://">Name</a>),
    image: 'img/dk_logo.jpg',
    title: (<>Title</>),
    description: (<>Description</>),
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
