'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BoxingFightSection.module.css';

const BoxingFightSection: React.FC = () => {
  return (
    <section className={styles.boxingFightSection}>
      {/* Background overlay number */}
      <div className={styles.backgroundNumber}>01</div>
      
      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Left side - Text content */}
        <div className={styles.textBlock}>
          <h1 className={styles.mainHeading}>King of the ring fight</h1>
          <a href="#" className={styles.viewCaseLink}>View Case</a>
        </div>

        {/* Right side - Image */}
        <div className={styles.imageContainer}>
          <Image 
            src="/boxer-image.jpg" 
            alt="Boxing fighter in action" 
            width={500}
            height={350}
            className={styles.boxerImage}
            priority
          />
        </div>
      </div>

      {/* Bottom left slider indicator */}
      <div className={styles.sliderIndicator}>
        <div className={styles.indicatorLine + ' ' + styles.active}></div>
        <div className={styles.indicatorLine}></div>
        <div className={styles.indicatorLine}></div>
      </div>

      {/* Bottom right social links */}
      <div className={styles.socialLinks}>
        <a href="#" className={styles.socialLink}>facebook</a>
        <a href="#" className={styles.socialLink}>dribbble</a>
        <a href="#" className={styles.socialLink}>instagram</a>
      </div>

      {/* Diagonal shadow overlay */}
      <div className={styles.diagonalShadow}></div>
    </section>
  );
};

export default BoxingFightSection;
