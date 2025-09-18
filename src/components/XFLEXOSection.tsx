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
  <section ref={sectionRef} id="about" className={styles.xflexoSection} suppressHydrationWarning>
      <div ref={gridRef} className={styles.gridContainer}>
        {/* Top Left Panel - Tall and Narrow */}
        <div className={`${styles.panel} ${styles.topLeftPanel}`}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>ABOUT</h3>
            <p className={styles.panelText}>
              Full‑stack developer crafting scalable products with Flutter + DRF and practical AI agents using Ollama.
            </p>
          </div>
        </div>

        {/* Top Right Panel - Dominant */}
        <div className={`${styles.panel} ${styles.topRightPanel}`}>
          <div className={styles.panelContent}>
            <div className={styles.brandIdentity}>
              <div className={styles.logoLarge}>MUKILAN</div>
            </div>
            <h1 className={styles.mainHeadline}>
              BUILD WITH CLARITY
            </h1>
            <p className={styles.mainDescription}>
              Product‑first engineering: clean architecture, solid UX, and reliable delivery across mobile, web, and desktop.
            </p>
          </div>
          <div className={styles.backgroundPattern}></div>
        </div>

        {/* Center Panel */}
        <div className={`${styles.panel} ${styles.centerPanel}`}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>HIGHLIGHTS</h3>
            <p className={styles.panelText}>
              Turftime, Billinall, ECMA Textile B2B, DisasterLink, Fashion Matching Agent.
            </p>
          </div>
        </div>

        {/* Bottom Left Panel */}
        <div className={`${styles.panel} ${styles.bottomLeftPanel}`}>
          <div className={styles.panelContent}>
            <h2 className={styles.secondaryHeadline}>
              EDUCATION & LEADERSHIP
            </h2>
            <p className={styles.secondaryDescription}>
              B.E. CSE @ VCET. Club Grand Master, EDC Coordinator, Hackelite2k25 website (solo in 15 hrs).
            </p>
          </div>
          <div className={styles.wavePattern}></div>
        </div>

        {/* Bottom Right Panel */}
        <div className={`${styles.panel} ${styles.bottomRightPanel}`}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>FOCUS</h3>
            <p className={styles.panelText}>
              AI agents, automation, cross‑platform apps, and maintainable systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XFLEXOSection;