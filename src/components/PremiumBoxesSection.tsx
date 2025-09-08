'use client';

import React, { useEffect, useRef } from 'react';
import styles from './PremiumBoxesSection.module.css';

const PremiumBoxesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Handle first section (boxes 1 & 2)
      if (sectionRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        let progress = 0;
        if (sectionTop <= windowHeight * 1.2 && sectionTop >= -rect.height) {
          progress = Math.min(1, Math.max(0, (windowHeight * 1.2 - sectionTop) / (windowHeight * 0.8)));
        }

        const boxes = section.querySelectorAll(`.${styles.premiumBox}`);
        boxes.forEach((box, index) => {
          const element = box as HTMLElement;
          
          if (index === 0) {
            const leftPosition = -100 + (progress * 100);
            element.style.transform = `translateX(${leftPosition}%)`;
          } else {
            const rightPosition = 100 - (progress * 100);
            element.style.transform = `translateX(${rightPosition}%)`;
          }
          
          element.style.opacity = progress.toString();
        });
      }

      // Handle second section (boxes 3 & 4)
      if (secondSectionRef.current) {
        const section = secondSectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        let progress = 0;
        if (sectionTop <= windowHeight * 1.2 && sectionTop >= -rect.height) {
          progress = Math.min(1, Math.max(0, (windowHeight * 1.2 - sectionTop) / (windowHeight * 0.8)));
        }

        const boxes = section.querySelectorAll(`.${styles.premiumBox}`);
        boxes.forEach((box, index) => {
          const element = box as HTMLElement;
          
          if (index === 0) {
            // Left box (03): comes from left side
            const leftPosition = -100 + (progress * 100);
            element.style.transform = `translateX(${leftPosition}%)`;
          } else {
            // Right box (04): comes from bottom
            const bottomPosition = 100 - (progress * 100);
            element.style.transform = `translateY(${bottomPosition}%)`;
          }
          
          element.style.opacity = progress.toString();
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className={styles.premiumBoxesSection}>
        <div className={styles.container}>
          <div className={styles.boxesWrapper}>
            
            {/* Left Box - Red with Black Text */}
            {/* <div className={styles.premiumBox + ' ' + styles.redBox}>
              <div className={styles.boxNumber}>01</div>
            </div> */}
            
            {/* Right Box - Black with White Text */}
            {/* <div className={styles.premiumBox + ' ' + styles.blackBox}>
              <div className={styles.boxNumber}>02</div>
            </div> */}
            
          </div>
        </div>
      </section>
      
      <section ref={secondSectionRef} className={styles.premiumBoxesSection}>
        <div className={styles.container}>
          <div className={styles.boxesWrapper}>
            
            {/* Left Box - Black with White Text */}
            {/* <div className={styles.premiumBox + ' ' + styles.blackBox}>
              <div className={styles.boxNumber}>03</div>
            </div> */}
            
            {/* Right Box - Red with Black Text */}
            {/* <div className={styles.premiumBox + ' ' + styles.redBox}>
              <div className={styles.boxNumber}>04</div>
            </div> */}
            
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumBoxesSection;
