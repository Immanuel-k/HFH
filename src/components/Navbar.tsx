import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Mission', href: '#pillars' },
    { name: 'Field Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 py-2.5 transition-all duration-300">
      {/* Sleek 2-3 cm Mirror Glass Container */}
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 liquid-glass-nav relative overflow-hidden ${
          isScrolled ? 'py-1.5 sm:py-2 px-5 sm:px-8 shadow-xl shadow-red-950/40' : 'py-2 sm:py-2.5 px-5 sm:px-8'
        }`}
      >
        {/* SVG Liquid Glass Distortion Filter Layer */}
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-full overflow-hidden"
          style={{
            backdropFilter: 'blur(4px)',
            filter: 'url(#glass-distortion)',
            isolation: 'isolate',
          }}
        />

        {/* Liquid Glass Inner Highlight Contour */}
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-full overflow-hidden"
          style={{
            boxShadow:
              'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.45), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Reflective Flare Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-red-500/10 pointer-events-none z-10 rounded-full"></div>

        <div className="flex items-center justify-between relative z-20">
          {/* Brand Logo with Tamil Motto on Single Line */}
          <a href="#" className="flex items-center space-x-3 group select-none">
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-900 p-0.5 shadow-md shadow-red-600/40 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Hands for Homeless Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-black text-sm sm:text-base tracking-tight text-white group-hover:text-red-400 transition-colors">
                  HANDS FOR HOMELESS
                </span>
                <span className="bg-red-950/80 border border-red-700/60 text-red-300 text-[10px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  HFH
                </span>
              </div>
              {/* Single Line Tamil Motto */}
              <div className="text-[11px] sm:text-xs text-red-400 font-tamil font-bold tracking-wide leading-none mt-0.5 whitespace-nowrap">
                "கற்றது சமத்துவம்"
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions - Single Line Phone Contact Number */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:+919344516020"
              className="flex items-center space-x-2 text-xs font-bold text-slate-100 hover:text-white liquid-glass-option px-4 py-2 rounded-full transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="whitespace-nowrap font-mono tracking-tight">+91 9344516020</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              href="tel:+919344516020"
              className="p-2 rounded-full liquid-glass-option text-slate-200"
              title="Call Helpline"
            >
              <Phone className="w-4 h-4 text-red-500" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer inside Liquid Glass */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-700/60 pt-3 pb-2 mt-2 space-y-2.5 animate-in fade-in slide-in-from-top-4 duration-300 relative z-20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-red-950/50 hover:text-red-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2">
              <a
                href="tel:+919344516020"
                className="flex items-center justify-center space-x-2 w-full text-xs font-bold text-slate-100 liquid-glass-option py-2.5 rounded-full whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span className="font-mono">+91 9344516020</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
