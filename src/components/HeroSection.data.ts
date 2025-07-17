import { HeroData } from './HeroSection.types';

export const heroData: HeroData = {
  personalInfo: {
    name: 'Mukilan',
    jobTitle: 'Currently front end engineer at Wise',
    location: 'Based in London\nUnited Kingdom',
    company: 'Wise'
  },
  content: {
    title: ['SOFTWARE', 'DEVELOPER'],
    description: [
      'I SUPPORT DESIGNERS',
      'AND AGENCIES WITH',
      'CREATIVE DEVELOPMENT'
    ],
    imageUrl: '/portrait.jpg',
    imageAlt: 'Mukilan - Software Developer'
  },
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]
};

// Alternative data structure for easy customization
export const customizeHeroData = (overrides: Partial<HeroData>): HeroData => ({
  ...heroData,
  ...overrides
});
