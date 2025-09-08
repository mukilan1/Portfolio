"use client";

import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>
            © 2025 Mukilan Portfolio. All rights reserved.
          </p>
          <div className={styles.links}>
            <a href="#home" className={styles.link}>Home</a>
            <a href="#about" className={styles.link}>About</a>
            <a href="#projects" className={styles.link}>Projects</a>
            <a href="#contact" className={styles.link}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
