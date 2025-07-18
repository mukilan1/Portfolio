"use client";

import React from 'react';
import styles from './EmptySection.module.css';

const EmptySection: React.FC = () => {
  return (
    <section className={styles.emptySection}>
      {/* Intentionally empty for scroll testing */}
    </section>
  );
};

export default EmptySection;
