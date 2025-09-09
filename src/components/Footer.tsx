"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(isVisible);

  // Keep ref in sync with state
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate how close we are to the bottom
      const scrollPercent = scrollY / (documentHeight - windowHeight);
      
      // Show footer only when 95% scrolled (very close to end), hide when less than 97%
      if (scrollPercent >= 0.95 && !isVisibleRef.current) {
        setIsVisible(true);
      } else if (scrollPercent < 0.97 && isVisibleRef.current) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer ref={footerRef} className={`${styles.footer} ${isVisible ? styles.animate : ''}`}>
      {/* Premium Top Border */}
      <div className={styles.premiumBorder}>
        <div className={styles.borderLine}></div>
        <div className={styles.borderAccents}>
          <div className={styles.borderDot}></div>
          <div className={styles.borderDot}></div>
          <div className={styles.borderDot}></div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.brandSection}>
            <h2 className={styles.brandTitle}>
              MUKILAN
              <div className={styles.titleGlow}></div>
            </h2>
            <div className={styles.brandSubtitle}>Portfolio</div>
            {/* Luxury Ornament */}
            <div className={styles.luxuryOrnament}>
              <div className={styles.ornamentLine}></div>
              <div className={styles.ornamentDiamond}></div>
              <div className={styles.ornamentLine}></div>
            </div>
          </div>
          
          <div className={styles.contactSection}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:hello@mukilan.dev" className={styles.contactLink}>
                hello@mukilan.dev
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactText}>Chennai, India</span>
            </div>
            {/* Availability Status */}
            <div className={styles.availabilityStatus}>
              <div className={styles.statusIndicator}></div>
              <span className={styles.statusText}>Available for projects</span>
            </div>
          </div>
        </div>

        {/* Premium Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerSection}></div>
          <div className={styles.dividerCenter}>
            <div className={styles.centerOrnament}></div>
          </div>
          <div className={styles.dividerSection}></div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <span>© 2025 Mukilan. All rights reserved.</span>
          </div>
          
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <span className={styles.linkText}>LinkedIn</span>
              <div className={styles.linkHoverEffect}></div>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.linkText}>GitHub</span>
              <div className={styles.linkHoverEffect}></div>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.linkText}>Twitter</span>
              <div className={styles.linkHoverEffect}></div>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.linkText}>Behance</span>
              <div className={styles.linkHoverEffect}></div>
            </a>
          </div>
        </div>
      </div>

      {/* Luxury Background Elements */}
      <div className={styles.backgroundPattern}>
        <div className={styles.patternGrid}></div>
        <div className={styles.floatingOrbs}>
          <div className={styles.orb}></div>
          <div className={styles.orb}></div>
          <div className={styles.orb}></div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className={styles.shimmerEffect}></div>
    </footer>
  );
};

export default Footer;
