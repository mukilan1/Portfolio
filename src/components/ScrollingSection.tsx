"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ScrollingSection.module.css';

const ScrollingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainersRef = useRef<HTMLDivElement[]>([]);

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
    { src: '/placeholder1.jpg', alt: 'Turftime' },
    { src: '/placeholder2.jpg', alt: 'Billinall' },
    { src: '/placeholder3.jpg', alt: 'ECMA Textile B2B' },
    { src: '/placeholder4.jpg', alt: 'Fashion Match AI' },
    { src: '/placeholder5.jpg', alt: 'DisasterLink' },
    { src: '/placeholder6.jpg', alt: 'Dark Pattern Buster' },
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
          <div
            key={index}
            ref={(el) => {
              if (el) imageContainersRef.current[index] = el;
            }}
            className={`${styles.imageWrapper} ${styles[`position${index + 1}`]}`}
          >
            <div className={styles.imagePlaceholder}>
              <span className={styles.placeholderText}>{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollingSection;
