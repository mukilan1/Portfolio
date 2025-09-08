"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './XFLEXOSection.module.css';

const XFLEXOSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (!sectionRef.current || !gridRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const viewportHeight = window.innerHeight;

      // Check if section is in view
      const isInView = sectionTop < viewportHeight && sectionTop + sectionRect.height > 0;

      if (isInView) {
        // Calculate progress (0 to 1) when section enters viewport
        const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / viewportHeight));

        // Slide-in animation for panels
        const panels = gridRef.current.querySelectorAll(`.${styles.panel}`);
        panels.forEach((panel, index) => {
          const htmlPanel = panel as HTMLElement;
          
          // Determine slide direction based on panel position
          let slideDirection = '';
          if (htmlPanel.classList.contains(styles.topLeftPanel) || 
              htmlPanel.classList.contains(styles.bottomLeftPanel) ||
              htmlPanel.classList.contains(styles.centerPanel)) {
            slideDirection = 'left';
          } else {
            slideDirection = 'right';
          }

          // Calculate slide distance
          const slideDistance = 100; // pixels
          const delay = index * 0.1; // staggered animation
          const adjustedProgress = Math.max(0, progress - delay);
          
          let translateX = 0;
          if (adjustedProgress < 1) {
            translateX = slideDirection === 'left' 
              ? -slideDistance * (1 - adjustedProgress)
              : slideDistance * (1 - adjustedProgress);
          }

          htmlPanel.style.transform = `translateX(${translateX}px)`;
          htmlPanel.style.opacity = adjustedProgress.toString();
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted]);

  return (
    <section ref={sectionRef} className={styles.xflexoSection} suppressHydrationWarning>
      <div ref={gridRef} className={styles.gridContainer}>
        {/* Top Left Panel - Tall and Narrow */}
        <div className={`${styles.panel} ${styles.topLeftPanel}`}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>INNOVATIVE</h3>
            <p className={styles.panelText}>
              Revolutionary design thinking that pushes boundaries and creates tomorrow&apos;s solutions today.
            </p>
          </div>
        </div>

        {/* Top Right Panel - Dominant */}
        <div className={`${styles.panel} ${styles.topRightPanel}`}>
          <div className={styles.panelContent}>
            <div className={styles.brandIdentity}>
              <div className={styles.logoLarge}>XFLEXO</div>
            </div>
            <h1 className={styles.mainHeadline}>
              DESIGN BEYOND LIMITS
            </h1>
            <p className={styles.mainDescription}>
              Where creativity meets technology to forge extraordinary experiences that define the future of digital interaction.
            </p>
          </div>
          <div className={styles.backgroundPattern}></div>
        </div>

        {/* Center Panel */}
        <div className={`${styles.panel} ${styles.centerPanel}`}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>CREATIVE</h3>
            <p className={styles.panelText}>
              Unleashing boundless imagination through cutting-edge methodologies.
            </p>
          </div>
        </div>

        {/* Bottom Left Panel */}
        <div className={`${styles.panel} ${styles.bottomLeftPanel}`}>
          <div className={styles.panelContent}>
            <h2 className={styles.secondaryHeadline}>
              NEXT GENERATION SOLUTIONS
            </h2>
            <p className={styles.secondaryDescription}>
              Pioneering the evolution of digital craftsmanship through innovative approaches and visionary execution.
            </p>
          </div>
          <div className={styles.wavePattern}></div>
        </div>

        {/* Bottom Right Panel */}
        <div className={`${styles.panel} ${styles.bottomRightPanel}`}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>FUTURE</h3>
            <p className={styles.panelText}>
              Building tomorrow&apos;s digital landscape with today&apos;s vision and expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XFLEXOSection;