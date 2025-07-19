"use client";

import React, { useEffect, useRef } from 'react';
import styles from './SoulSection.module.css';

const SoulSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
      ));

      // Animate each letter with different directions and speeds
      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;

        const speeds = [1.5, -2.2, 1.8, -1.2]; // Increased speeds for C, O, D, E
        const baseOffset = scrollProgress * 150 * speeds[index]; // Increased multiplier from 100 to 150
        
        letter.style.transform = `translateY(${baseOffset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.soulSection}>
      <div className={styles.container}>
        {/* Column 1: "C" */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <span 
              ref={(el) => { letterRefs.current[0] = el; }}
              className={styles.letter}
            >
              C
            </span>
          </div>
        </div>

        {/* Column 2: "O" */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <span 
              ref={(el) => { letterRefs.current[1] = el; }}
              className={styles.letterO}
            >
              O
            </span>
          </div>
        </div>

        {/* Column 3: "D" */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <span 
              ref={(el) => { letterRefs.current[2] = el; }}
              className={styles.letter}
            >
              D
            </span>
          </div>
        </div>

        {/* Column 4: "E" */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <span 
              ref={(el) => { letterRefs.current[3] = el; }}
              className={styles.letter}
            >
              E
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoulSection;
