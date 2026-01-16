"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScrollingSection.module.css';

const ScrollingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainersRef = useRef<HTMLDivElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));

      imageContainersRef.current.forEach((container, index) => {
        if (!container) return;

        const speed = 0.5 + (index * 0.2); // Different speeds for each container
        const direction = index % 2 === 0 ? 1 : -1; // Alternate directions
        const translateX = scrollProgress * 200 * speed * direction;

        container.style.transform = `translateX(${translateX}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [
    { src: '/Helmet_Project.jpeg', alt: 'Turftime', id: 'img1' },
    { src: '/Speaker_Poster.jpeg', alt: 'DisasterLink', id: 'img2' },
    { src: '/Guiness_Participation_Certificate.jpeg', alt: 'ECMA Textile B2B', id: 'img3' },
    { src: '/Instagram_creator_Poster.jpeg', alt: 'Fashion Matching Agent', id: 'img4' },
    { src: '/DPBH_Hackathon_Certificate.jpeg', alt: 'Billinall', id: 'img5' },
    { src: '/Speech_1.jpeg', alt: 'Dark Pattern Buster', id: 'img6' },
  ];

  return (
    <section ref={sectionRef} id="work" className={styles.scrollingSection}>
      <div className={styles.centeredText}>
        <h2 className={styles.mainTitle}>
          <span className={styles.titleLine}>CREATIVE</span>
          <span className={styles.titleLine}>WORK</span>
        </h2>
      </div>

      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            layoutId={image.id}
            onClick={() => setSelectedId(image.id)}
            ref={(el: HTMLDivElement) => {
              if (el) imageContainersRef.current[index] = el;
            }}
            className={`${styles.imageWrapper} ${styles[`position${index + 1}`]}`}
          >
            <div className={styles.imagePlaceholder}>
              <motion.img
                src={image.src}
                alt={image.alt}
                className={styles.projectImage}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className={styles.overlay} onClick={() => setSelectedId(null)}>
            <motion.div
              layoutId={selectedId}
              className={styles.expandedContainer}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 180, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            >
              <button className={styles.closeButton} onClick={() => setSelectedId(null)}>×</button>
              {(() => {
                const selectedImage = images.find(img => img.id === selectedId);
                return (
                  <motion.img
                    src={selectedImage?.src}
                    alt={selectedImage?.alt}
                    className={styles.expandedImage}
                  />
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScrollingSection;
