'use client';

import React, { useState } from 'react';
import styles from './AnimeCatalogSection.module.css';

const AnimeCatalogSection: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const animeData = [
    { title: "Attack on Titan", genre: "Action", description: "In a world where humanity lives in fear of giant humanoid Titans, a young boy named Eren Jaeger becomes determined to fight back..." },
    { title: "Demon Slayer", genre: "Supernatural", description: "A young boy becomes a demon slayer to save his sister and avenge his family in feudal Japan..." },
    { title: "Naruto", genre: "Adventure", description: "Follow the journey of Naruto Uzumaki, a young ninja who seeks recognition and dreams of becoming the Hokage..." },
    { title: "One Piece", genre: "Adventure", description: "Join Monkey D. Luffy and his pirate crew in search of the greatest treasure known as One Piece..." },
    { title: "Death Note", genre: "Psychological", description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name..." },
    { title: "My Hero Academia", genre: "Superhero", description: "In a world where most people have superpowers, a powerless boy aims to become the greatest hero..." },
    { title: "Dragon Ball Z", genre: "Action", description: "Follow Goku and his friends as they defend Earth against powerful enemies and seek the Dragon Balls..." },
    { title: "One Punch Man", genre: "Comedy", description: "A superhero who can defeat any enemy with a single punch struggles with the mundane problems of everyday life..." },
    { title: "Fullmetal Alchemist", genre: "Adventure", description: "Two brothers use alchemy in their quest to find the Philosopher's Stone and restore their bodies..." },
    { title: "Tokyo Ghoul", genre: "Horror", description: "A college student becomes a half-ghoul and must navigate the dangerous world of ghouls and humans..." }
  ];

  const displayedAnime = showMore ? animeData : animeData.slice(0, 4);

  return (
    <section className={styles.animeCatalogSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Anime Catalog</h2>
        
        <div className={styles.cardsGrid}>
          {displayedAnime.map((anime, index) => (
            <div key={index} className={styles.animeCard}>
              {/* Image Block */}
              <div className={`${styles.imageBlock} ${styles[`anime${index + 1}Image`]}`}>
                <div className={styles.genreTag}>
                  <span className={styles.genreText}>{anime.genre}</span>
                </div>
                <div className={styles.characterSilhouette}></div>
              </div>
              
              {/* Title + Description */}
              <div className={styles.textBlock}>
                <h3 className={styles.cardTitle}>{anime.title}</h3>
                <p className={styles.cardDescription}>{anime.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className={styles.showMoreContainer}>
          <button 
            className={styles.showMoreButton}
            onClick={() => setShowMore(!showMore)}
          >
            <span className={styles.buttonText}>
              {showMore ? 'Show Less' : 'Show More'}
            </span>
            <div className={styles.arrowIcon}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                className={showMore ? styles.rotated : ''}
              >
                <path 
                  d="M4 6L8 10L12 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnimeCatalogSection;
