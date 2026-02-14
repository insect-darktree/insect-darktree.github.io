import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './LandingpageText.module.css';
import Link from '@docusaurus/Link';

const LandingpageText: React.FC = () => {
  return (
    <div className={styles.Content}>
      <div className={styles.HeaderContainer}>
        <h3 className={styles.Tagline}>Charting the dark regions of the insect tree</h3>
        <h4 className={styles.DescriptionBold}>
          The DarkTree project aims to sequence 3,000 insect genomes from the most poorly studied radiations in the insect tree of life. Many of these “dark taxa” have been neglected by taxonomists and ecologists for centuries because they are so diverse and challenging to identify. Nevertheless, they occupy key niches in insect communities, often as decomposers or parasitoids, and represent millions of years of insect genome evolution that has not been studied to date.
        </h4>
        <h4 className={styles.DescriptionBold}>
          DarkTree is based on material from tens of thousands of Malaise trap samples from around the world, which have gone through DNA metabarcoding. This allows us to reliably identify the darkest regions in the insect tree, and select a balanced set of representative species for genome sequencing.
          </h4>
          <h4 className={styles.DescriptionBold}>
As part of the project, we are developing and refining a state-of-the-art pipeline using genome sequencing, computer vision, and probabilistic machine learning. Read more about the project here, and how you can contribute to and benefit from this effort to advance the frontier in insect diversity research.
        </h4>
      </div>
    </div>
  );
};



export default LandingpageText;

