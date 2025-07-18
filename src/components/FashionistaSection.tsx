"use client";

import React, { useEffect, useRef } from 'react';
import styles from './FashionistaSection.module.css';

const FashionistaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const viewportHeight = window.innerHeight;

      // Trigger animation when section is 20% visible from bottom
      const triggerPoint = viewportHeight * 0.8;
      
      if (sectionTop < triggerPoint && sectionBottom > 0) {
        // Section is visible, add animation
        sectionRef.current.classList.add(styles.visible);
      } else {
        // Section is out of view, remove animation to reset for next scroll
        sectionRef.current.classList.remove(styles.visible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.fashionistaSection}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          <h2 className={styles.mainHeading}>
            THE FASHIONISTA&apos;S DIARY: LET&apos;S START
          </h2>
          
          <p className={styles.subheading}>
            TRUSTED BY: WOCOMMENDS
          </p>
          
          <div className={styles.bulletSection}>
            <h3 className={styles.bulletTitle}>
              CHIC AND SUSTAINABLE STYLE
            </h3>
            <ul className={styles.bulletList}>
              <li>A budgeting fashion investment</li>
              <li>Prioritizing creative reuse of pieces</li>
              <li>The influence of sustainable influencers</li>
            </ul>
          </div>
          
          <button className={styles.shopButton}>
            SHOP NOW IN FASHION DIARY
          </button>
        </div>
        
        {/* Right Content - Year Display */}
        <div className={styles.rightContent}>
          <div className={styles.yearDisplay}>
            <span className={styles.yearTop}>20</span>
            <span className={styles.yearBottom}>23</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionistaSection;
