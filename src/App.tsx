import React from 'react';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutFounder } from './components/AboutFounder';
import { PillarsGrid } from './components/PillarsGrid';
import { Gallery } from './components/Gallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GlassFilter } from '@/components/ui/liquid-glass';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100 selection:bg-red-600 selection:text-white">
      {/* Liquid Glass SVG Distortion Filter */}
      <GlassFilter />

      {/* Interactive 3D Canvas Background */}
      <Background3D />

      {/* Sleek Mirror Glass Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <AboutFounder />
        <PillarsGrid />
        <Gallery />
        <ContactSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default App;
