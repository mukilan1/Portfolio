'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimeCatalogSection.module.css';

const AnimeCatalogSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
          
          {/* 🔴 Card 1 – "Attack on Titan" (Far Left) */}
          <div className={`${styles.animeCard} ${styles.card1}`}>
            {/* Image Block (Top Section) */}
            <div className={`${styles.imageBlock} ${styles.attackOnTitanImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>Action</span>
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
              <h3 className={styles.cardTitle}>Attack on Titan</h3>
              <p className={styles.cardDescription}>
                In a world where humanity lives in fear of giant
                humanoid Titans, a young boy named Eren Jaeger
                becomes determined to fight back an…
              </p>
            </div>
          </div>

          {/* ⚫ Card 2 – "Demon Slayer" */}
          <div className={`${styles.animeCard} ${styles.card2}`}>
            {/* Image Block */}
            <div className={`${styles.imageBlock} ${styles.demonSlayerImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>Fantasy</span>
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
              <h3 className={styles.cardTitle}>Demon Slayer</h3>
              <p className={styles.cardDescription}>
                In Taisho-era Japan, a young boy named
                Tanjiro Kamado sets out on a journey to
                become a demon slayer after his family is mu…
              </p>
            </div>
          </div>

          {/* 🟡 Card 3 – "Cowboy Bebop" */}
          <div className={`${styles.animeCard} ${styles.card3}`}>
            {/* Image Block */}
            <div className={`${styles.imageBlock} ${styles.cowboyBebopImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>Sci-Fi</span>
              </div>
              {/* Spike Spiegel and Faye Valentine */}
              <div className={styles.spikeSilhouette}></div>
              <div className={styles.fayeSilhouette}></div>
              <div className={styles.neoNoirBackground}></div>
            </div>
            
            <div className={styles.textBlock}>
              <h3 className={styles.cardTitle}>Cowboy Bebop</h3>
              <p className={styles.cardDescription}>
                In a future where humanity has colonized the
                solar system, a ragtag crew of bounty hunters
                chase down the solar system&apos;s most dangerou…
              </p>
            </div>
          </div>

          {/* 🟠 Card 4 – "One Piece" (Far Right) */}
          <div className={`${styles.animeCard} ${styles.card4}`}>
            {/* Image Block */}
            <div className={`${styles.imageBlock} ${styles.onePieceImage}`}>
              <div className={styles.genreTag}>
                <span className={styles.genreText}>Adventure</span>
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
              <h3 className={styles.cardTitle}>One Piece</h3>
              <p className={styles.cardDescription}>
                In a world filled with pirates, marines, and dev-
                il fruit users, a young boy named Monkey D.
                Luffy sets out on a journey to become the Kin…
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnimeCatalogSection;
