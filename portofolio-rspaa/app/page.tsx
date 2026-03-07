import MeshGradientBg from './components/MeshGradientBg';
import FloatingParticles from './components/FloatingParticles';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TechOrbit from './components/TechOrbit';
import HorizontalProjects from './components/HorizontalProjects';
import ContactSection from './components/ContactSection';

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
      <AboutSection />
      <TechOrbit />
      <HorizontalProjects />
      <ContactSection />
    </main>
  );
}
