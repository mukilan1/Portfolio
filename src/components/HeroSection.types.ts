// Types for Hero Section Component
export interface HeroSectionProps {
  name?: string;
  jobTitle?: string;
  location?: string;
  company?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface HeroData {
  personalInfo: {
    name: string;
    jobTitle: string;
    location: string;
    company: string;
  };
  content: {
    title: string[];
    description: string[];
    imageUrl: string;
    imageAlt: string;
  };
  navigation: NavigationItem[];
}
