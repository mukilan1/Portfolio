import { HeroData } from './HeroSection.types';

export const heroData: HeroData = {
  personalInfo: {
    name: 'Mukilan',
    jobTitle: 'A Fullstack developer with rapid development skill',
    location: 'Based in India\nTamil Nadu',
    company: 'Scable.in'
  },
  content: {
    title: ['SOFTWARE', 'DEVELOPER'],
    description: [],
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
