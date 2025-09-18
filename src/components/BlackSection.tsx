"use client";

import React, { useEffect, useRef } from 'react';
import styles from './BlackSection.module.css';

const BlackSection: React.FC = () => {
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

      // Train-like animation: from right (100%) through center (0%) to left (-100%)
      // Maps scroll progress 0->1 to transform 100% -> -100%
      const translateXPercent = 100 - (scrollProgress * 200); // 100% to -100%
      
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
    <section ref={sectionRef} className={styles.blackSection}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          <h2 className={styles.mainHeading}>
            SKILLS & TOOLING
          </h2>
          
          <p className={styles.subheading}>
            BUILD • AUTOMATE • DEPLOY
          </p>
          
          <div className={styles.bulletSection}>
            <h3 className={styles.bulletTitle}>
              CORE STACK
            </h3>
            <ul className={styles.bulletList}>
              <li>Flutter, Django REST Framework, Python, Dart</li>
              <li>MySQL, Docker, Linux, Git/GitHub, CI basics</li>
              <li>AI: Ollama, RAG, Prompt Engineering, Agents</li>
            </ul>
          </div>
          
          <button className={styles.shopButton}>
            DOWNLOAD RESUME
          </button>
        </div>
        
        {/* Right Content - Year Display */}
        <div className={styles.rightContent}>
          <div className={styles.yearDisplay}>
            <span className={styles.yearTop}>20</span>
            <span className={styles.yearBottom}>26</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlackSection;
