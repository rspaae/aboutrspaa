import MeshGradientBg from './components/MeshGradientBg';
import FloatingParticles from './components/FloatingParticles';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Expertise from './components/Expertise';
import TechOrbit from './components/TechOrbit';
import HorizontalProjects from './components/HorizontalProjects';
import ContactSection from './components/ContactSection';
import ScrollReveal from './components/ScrollReveal';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <MeshGradientBg />
      <FloatingParticles />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <HeroSection />

      <ScrollReveal direction="up" delay={100}>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <Expertise />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <TechOrbit />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <HorizontalProjects />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <ContactSection />
      </ScrollReveal>
    </main>
  );
}
