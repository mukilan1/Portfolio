# HeroSection Component

A professional, responsive hero section component based on the Richard Ekwonye portfolio design.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **TypeScript Support**: Fully typed with interfaces and type safety
- **CSS Modules**: Scoped styling with professional CSS modules
- **Customizable**: Easy to modify content through props and data files
- **Professional Structure**: Clean, maintainable code structure

## File Structure

```
src/components/
├── HeroSection.tsx           # Main component
├── HeroSection.module.css    # Scoped styles
├── HeroSection.types.ts      # TypeScript interfaces
├── HeroSection.data.ts       # Content data
└── index.ts                  # Export barrel
```

## Usage

### Basic Usage

```tsx
import { HeroSection } from '../components';

export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
```

### Customized Usage

```tsx
import { HeroSection } from '../components';

export default function Home() {
  return (
    <div>
      <HeroSection
        name="Your Name"
        jobTitle="Your Job Title"
        location="Your Location"
        description="Your custom description"
        imageUrl="/your-image.jpg"
        imageAlt="Your image alt text"
      />
    </div>
  );
}
```

## Customization

### Updating Content

Edit `src/components/HeroSection.data.ts` to change the default content:

```typescript
export const heroData: HeroData = {
  personalInfo: {
    name: 'Your Name',
    jobTitle: 'Your Job Title',
    location: 'Your Location',
    company: 'Your Company'
  },
  content: {
    title: ['YOUR', 'TITLE'],
    description: [
      'YOUR DESCRIPTION',
      'LINE TWO',
      'LINE THREE'
    ],
    imageUrl: '/your-image.jpg',
    imageAlt: 'Your image description'
  },
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]
};
```

### Styling

The component uses CSS modules for styling. Edit `src/components/HeroSection.module.css` to customize:

- Colors
- Typography
- Spacing
- Responsive breakpoints
- Animations

### Image Requirements

Add your portrait image to the `public` folder:

- **File name**: `portrait.jpg` (or update the path in data file)
- **Dimensions**: ~400x300px (or similar aspect ratio)
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution for crisp display

## Design Features

- **Minimalist Design**: Clean, professional aesthetic
- **Typography**: Bold, impactful headings with readable body text
- **Layout**: Asymmetrical balance with strategic white space
- **Responsive**: Mobile-first approach with breakpoints at 480px, 768px, and 1024px
- **Accessibility**: Proper semantic HTML and contrast ratios

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 18+
- Next.js 13+
- TypeScript 4.5+

## License

This component is part of your portfolio project.
