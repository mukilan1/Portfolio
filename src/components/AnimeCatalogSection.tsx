'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimeCatalogSection.module.css';

const AnimeCatalogSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      const sectionTop = rect.top;
      
      // When section enters viewport from bottom
      const enterProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.8)));
      
      setScrollProgress(enterProgress);
      
      // Add classes based on scroll progress
      section.classList.remove('show-card1', 'show-card2', 'show-card3', 'show-card4');
      
      if (enterProgress >= 0.25) section.classList.add('show-card1');
      if (enterProgress >= 0.5) section.classList.add('show-card2');
      if (enterProgress >= 0.75) section.classList.add('show-card3');
      if (enterProgress >= 1) section.classList.add('show-card4');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={styles.animeCatalogSection}
    >
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          
          {/* Card 1 – Turftime */}
          <div className={`${styles.animeCard} ${styles.card1}`}>
            {/* Image Block (Top Section) */}
            <div className={`${styles.imageBlock} ${styles.attackOnTitanImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>Product</span>
              </div>
              {/* Eren Jaeger silhouette with dual blades */}
              <div className={styles.characterSilhouette}>
                <div className={styles.erenSilhouette}></div>
                <div className={styles.dualBlades}></div>
              </div>
              {/* Sunset sky with bright white sun */}
              <div className={styles.sunsetSky}>
                <div className={styles.brightSun}></div>
              </div>
            </div>
            
            {/* Title + Description (Bottom Text Block) */}
            <div className={styles.textBlock}>
              <h3 className={styles.cardTitle}>Turftime</h3>
              <p className={styles.cardDescription}>
                Turf booking platform for owners and players. Built with Flutter + DRF,
                featuring schedules, payments, and admin tools.
              </p>
            </div>
          </div>

          {/* Card 2 – Billinall */}
          <div className={`${styles.animeCard} ${styles.card2}`}>
            {/* Image Block */}
            <div className={`${styles.imageBlock} ${styles.demonSlayerImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>Desktop</span>
              </div>
              {/* Giant red sun with black brushstroke dragon */}
              <div className={styles.redSunDragon}>
                <div className={styles.giantRedSun}></div>
                <div className={styles.dragonSilhouette}></div>
              </div>
              {/* Tanjiro silhouette on foggy ground */}
              <div className={styles.tanjiroSilhouette}></div>
              <div className={styles.foggyGround}></div>
            </div>
            
            <div className={styles.textBlock}>
              <h3 className={styles.cardTitle}>Billinall</h3>
              <p className={styles.cardDescription}>
                Professional billing software with invoices, quotations, credit/debit notes
                and printer integration. Deployed on Windows and Android.
              </p>
            </div>
          </div>

          {/* Card 3 – ECMA Textile B2B */}
          <div className={`${styles.animeCard} ${styles.card3}`}>
            {/* Image Block */}
            <div className={`${styles.imageBlock} ${styles.cowboyBebopImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>B2B</span>
              </div>
              {/* Spike Spiegel and Faye Valentine */}
              <div className={styles.spikeSilhouette}></div>
              <div className={styles.fayeSilhouette}></div>
              <div className={styles.neoNoirBackground}></div>
            </div>
            
            <div className={styles.textBlock}>
              <h3 className={styles.cardTitle}>ECMA Textile Platform</h3>
              <p className={styles.cardDescription}>
                B2B platform for textile professionals in Erode district with Flutter + DRF.
                Multi-platform apps and an admin panel.
              </p>
            </div>
          </div>

          {/* Card 4 – Fashion Matching AI */}
          <div className={`${styles.animeCard} ${styles.card4}`}>
            {/* Image Block */}
            <div className={`${styles.imageBlock} ${styles.onePieceImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>AI</span>
              </div>
              {/* Luffy silhouette with pirate ships */}
              <div className={styles.luffySilhouette}></div>
              <div className={styles.pirateSetting}>
                <div className={styles.tallShips}></div>
                <div className={styles.pirateFlags}></div>
                <div className={styles.settingSun}></div>
              </div>
            </div>
            
            <div className={styles.textBlock}>
              <h3 className={styles.cardTitle}>Fashion Matching Agent</h3>
              <p className={styles.cardDescription}>
                Local image analysis and pose detection with Ollama-backed LLM for
                outfit suggestions and text-to-image search.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnimeCatalogSection;
