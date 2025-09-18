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
            
            {/* Left Box - Experience */}
            <div className={styles.premiumBox + ' ' + styles.redBox}>
              <div className={styles.boxNumber}>01</div>
              <div className={`${styles.contentOverlay} ${styles.contentDark}`}>
                <h3 className={styles.boxHeading}>Experience</h3>
                <ul className={styles.boxList}>
                  <li>Founder, Scable India Pvt Ltd (Dec 2023 – Apr 2025)</li>
                  <li>Full-Stack Dev, Creative i (Jun 2025 – Jul 2025)</li>
                </ul>
                <div className={styles.boxMeta}>Projects: Turftime, Billinall, ECMA Textile Platform</div>
              </div>
            </div>
            
            {/* Right Box - Projects Snapshot */}
            <div className={styles.premiumBox + ' ' + styles.blackBox}>
              <div className={styles.boxNumber}>02</div>
              <div className={`${styles.contentOverlay} ${styles.contentLight}`}>
                <h3 className={styles.boxHeading}>Featured AI & Automation</h3>
                <ul className={styles.boxList}>
                  <li>Fashion Matching Agent (Mar–Apr 2025)</li>
                  <li>DisasterLink (Sep–Oct 2024)</li>
                  <li>Dark Pattern Buster (Feb–May 2024)</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      <section ref={secondSectionRef} className={styles.premiumBoxesSection}>
        <div className={styles.container}>
          <div className={styles.boxesWrapper}>
            
            {/* Left Box - Education */}
            <div className={styles.premiumBox + ' ' + styles.blackBox}>
              <div className={styles.boxNumber}>03</div>
              <div className={`${styles.contentOverlay} ${styles.contentLight}`}>
                <h3 className={styles.boxHeading}>Education</h3>
                <div className={styles.boxMeta}>B.E. Computer Science, VCET (Nov 2022 – May 2026)</div>
                <ul className={styles.boxList}>
                  <li>Grand Master (President) – Dept. Club; built club website</li>
                  <li>Student Coordinator – Entrepreneur Development Cell</li>
                  <li>VCET Hackelite2k25 website (solo, 15 hours)</li>
                </ul>
              </div>
            </div>
            
            {/* Right Box - Skills */}
            <div className={styles.premiumBox + ' ' + styles.redBox}>
              <div className={styles.boxNumber}>04</div>
              <div className={`${styles.contentOverlay} ${styles.contentDark}`}>
                <h3 className={styles.boxHeading}>Skills</h3>
                <div className={styles.boxMeta}>Flutter • DRF • Python • Dart • Docker • MySQL</div>
                <div className={`${styles.boxMeta} ${styles.mt6}`}>AI: Ollama • RAG • Agents • Prompt Engineering</div>
                <div className={`${styles.boxMeta} ${styles.mt6}`}>Tools: Git/GitHub • Figma • Canva • Illustrator</div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumBoxesSection;
