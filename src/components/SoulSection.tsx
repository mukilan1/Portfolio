"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
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

        const speeds = [0.5, -0.8, 0.6, -0.4]; // Different speeds for C, O, D, E
        const baseOffset = scrollProgress * 100 * speeds[index];
        
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
          <div className={styles.columnNumber}>01</div>
        </div>

        {/* Column 2: "O" with Portrait */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <div className={styles.oLetterContainer}>
              <span 
                ref={(el) => { letterRefs.current[1] = el; }}
                className={styles.letterO}
              >
                O
              </span>
              <div className={styles.imageWindow}>
                <Image
                  src="/portrait.jpg"
                  alt="Portrait"
                  width={400}
                  height={600}
                  className={styles.portraitImage}
                />
                <div className={styles.textOverlay}>
                  <span className={styles.overlayText}>FOLLOW YOUR DREAMS</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.columnNumber}>02</div>
        </div>

        {/* Column 3: "D" with Text Block */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <span 
              ref={(el) => { letterRefs.current[2] = el; }}
              className={styles.letter}
            >
              D
            </span>
          </div>
          <div className={styles.columnNumber}>03</div>
        </div>

        {/* Column 4: "E" with Copyright */}
        <div className={styles.column}>
          <div className={styles.letterContainer}>
            <span 
              ref={(el) => { letterRefs.current[3] = el; }}
              className={styles.letter}
            >
              E
            </span>
          </div>
          <div className={styles.copyrightText}>
            <span className={styles.verticalText}>COPYRIGHT © 2020</span>
          </div>
          <div className={styles.columnNumber}>04</div>
        </div>
      </div>
    </section>
  );
};

export default SoulSection;
