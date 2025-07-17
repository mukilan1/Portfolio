"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import { HeroSectionProps } from './HeroSection.types';
import { heroData } from './HeroSection.data';
import { GradientText } from './ui/gradient-text';

const HeroSection: React.FC<HeroSectionProps> = ({
  name = heroData.personalInfo.name,
  jobTitle = heroData.personalInfo.jobTitle,
  location = heroData.personalInfo.location,
  description = heroData.content.description.join('\n'),
  imageUrl = heroData.content.imageUrl,
  imageAlt = heroData.content.imageAlt
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / viewportHeight, 1);

      // Animate title (move up and fade)
      if (titleRef.current) {
        const translateY = scrollProgress * -100;
        const opacity = Math.max(1 - scrollProgress * 1.5, 0);
        titleRef.current.style.transform = `translateY(${translateY}px)`;
        titleRef.current.style.opacity = opacity.toString();
      }

      // Animate image (move right and scale)
      if (imageRef.current) {
        const translateX = scrollProgress * 150;
        const scale = Math.max(1 - scrollProgress * 0.3, 0.7);
        imageRef.current.style.transform = `translateX(${translateX}px) scale(${scale})`;
      }

      // Animate name (move left and fade)
      if (nameRef.current) {
        const translateX = scrollProgress * -120;
        const opacity = Math.max(1 - scrollProgress * 1.2, 0);
        nameRef.current.style.transform = `translateX(${translateX}px)`;
        nameRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section className={styles.heroContainer}>
      {/* Header Navigation */}
      <header className={styles.heroHeader}>
        <div className={styles.headerInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.jobTitle}>{jobTitle}</span>
          <span className={styles.location} dangerouslySetInnerHTML={{ __html: location.replace(/\n/g, '<br />') }} />
        </div>
        <nav className={styles.headerNav}>
          {heroData.navigation.map((item, index) => (
            <React.Fragment key={item.label}>
              <a href={item.href}>{item.label}</a>
              {index < heroData.navigation.length - 1 && <span>,</span>}
            </React.Fragment>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 ref={titleRef} className={styles.heroTitle}>
            {heroData.content.title.map((line, index) => (
              <span key={index} className={styles.titleLine}>
                {line === 'SOFTWARE' ? (
                  <GradientText className="text-inherit font-inherit">
                    {line}
                  </GradientText>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          
          <div ref={imageRef} className={styles.heroImageContainer}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={400}
              height={300}
              className={styles.heroImage}
              priority
            />
          </div>

          <div className={styles.heroDescription}>
            <div className={styles.arrowIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />
          </div>
        </div>

        <div className={styles.heroRight}>
          <h2 ref={nameRef} className={styles.heroName}>
            {name.split(' ').map((namePart, index) => (
              <span key={index} className={styles.nameLine}>{namePart.toUpperCase()}</span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
