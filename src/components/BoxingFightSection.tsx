'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './BoxingFightSection.module.css';

const BoxingFightSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const isInView = entry.isIntersecting && entry.intersectionRatio > 0.2; // Reduced threshold
            if (isInView !== isVisible) { // Only update if state actually changed
              setIsVisible(isInView);
            }
          });
        });
      },
      {
        threshold: [0, 0.2, 0.5, 1], // Fewer thresholds for better performance
        rootMargin: '-10% 0px -10% 0px' // Smaller margin for earlier detection
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]); // Include isVisible to prevent unnecessary re-renders // Empty dependency array to prevent re-creation

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.boxingFightSection} ${isVisible ? styles.animate : ''}`}
    >
      {/* Background overlay number */}
      <div className={styles.backgroundNumber}>01</div>
      
      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Left side - Text content */}
        <div className={styles.textBlock}>
          <h1 className={styles.mainHeading}><span>King of the ring</span><span>fight</span></h1>
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
