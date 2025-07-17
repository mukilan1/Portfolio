import React from 'react';
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
          <h1 className={styles.heroTitle}>
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
          
          <div className={styles.heroImageContainer}>
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
          <h2 className={styles.heroName}>
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
