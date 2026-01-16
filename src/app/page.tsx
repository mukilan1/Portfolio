import { HeroSection, ScrollingSection, FashionistaSection, BlackSection, SoulSection, AnimeCatalogSection, PremiumBoxesSection, BoxingFightSection, XFLEXOSection, Footer } from '../components';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollingSection />
      <FashionistaSection />
      <BlackSection />
      <SoulSection />
      <AnimeCatalogSection />
      <PremiumBoxesSection />
      <BoxingFightSection />
      <XFLEXOSection />
      <div style={{ height: '50vh', backgroundColor: '#ffffff' }} />
    </>
  );
}
