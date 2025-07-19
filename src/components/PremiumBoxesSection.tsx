'use client';

import React, { useEffect, useRef } from 'react';
import styles from './PremiumBoxesSection.module.css';

const PremiumBoxesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for this section
      const sectionTop = rect.top;
      
      // Progress from 0 to 1 as section approaches viewport
      let progress = 0;
      if (sectionTop <= windowHeight * 1.2 && sectionTop >= -rect.height) {
        // Animation starts when section is 20% below viewport and completes before crossing
        progress = Math.min(1, Math.max(0, (windowHeight * 1.2 - sectionTop) / (windowHeight * 0.8)));
      }

      const boxes = section.querySelectorAll(`.${styles.premiumBox}`);
      boxes.forEach((box, index) => {
        const element = box as HTMLElement;
        
        if (index === 0) {
          // Left box: starts at -100% and moves to 0%
          const leftPosition = -100 + (progress * 100);
          element.style.transform = `translateX(${leftPosition}%)`;
        } else {
          // Right box: starts at 100% and moves to 0%
          const rightPosition = 100 - (progress * 100);
          element.style.transform = `translateX(${rightPosition}%)`;
        }
        
        element.style.opacity = progress.toString();
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.premiumBoxesSection}>
      <div className={styles.container}>
        <div className={styles.boxesWrapper}>
          
          {/* Left Box - Red with Black Text */}
          <div className={styles.premiumBox + ' ' + styles.redBox}>
            <div className={styles.boxNumber}>01</div>
          </div>
          
          {/* Right Box - Black with White Text */}
          <div className={styles.premiumBox + ' ' + styles.blackBox}>
            <div className={styles.boxNumber}>02</div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PremiumBoxesSection;
