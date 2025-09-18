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
      const viewportHeight = window.innerHeight;
      const sectionHeight = sectionRect.height;

      // Calculate scroll progress through the section (0 to 1)
      // When section enters from bottom to when it exits from top
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
      ));

      // Train-like animation: from left (-100%) through center (0%) to right (100%)
      // Maps scroll progress 0->1 to transform -100% -> 100%
      const translateXPercent = (scrollProgress * 200) - 100; // -100% to +100%
      
      if (sectionRef.current) {
        sectionRef.current.style.transform = `translateX(${translateXPercent}%)`;
        sectionRef.current.style.opacity = scrollProgress > 0 ? '1' : '0';
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
            FULL-STACK DEVELOPER & AI BUILDER
          </h2>
          
          <p className={styles.subheading}>
            PRODUCT-FOCUSED • SCALABLE • UX-DRIVEN
          </p>
          
          <div className={styles.bulletSection}>
            <h3 className={styles.bulletTitle}>
              SUMMARY HIGHLIGHTS
            </h3>
            <ul className={styles.bulletList}>
              <li>Flutter + Django REST: production apps across Android, iOS, Web</li>
              <li>AI agents with Ollama; automation and real-time solutions</li>
              <li>Architected systems with strong UI/UX and reliability</li>
            </ul>
          </div>
          
          <button className={styles.shopButton}>
            VIEW WORK & CONTACT
          </button>
        </div>
        
        {/* Right Content - Year Display */}
        <div className={styles.rightContent}>
          <div className={styles.yearDisplay}>
            <span className={styles.yearTop}>20</span>
            <span className={styles.yearBottom}>25</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionistaSection;
