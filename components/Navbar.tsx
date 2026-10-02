"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/15 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Minimalist Bold Serif Logo */}
          <a href="#" className="flex items-center group py-1">
            <span className="font-cinzel font-black text-2xl sm:text-3xl tracking-[0.2em] uppercase transition-all duration-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
              <span className="text-white">FINAL</span>
              <span className="text-glitter-silver ml-0.5">DRFT</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-megalona text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              What We Do ?
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors">
              Customer Reviews
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="editorial-button inline-flex items-center gap-2 px-6 py-2.5 text-xs font-megalona font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Schedule Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-6 rounded-2xl bg-black/95 border border-white/20 backdrop-blur-2xl flex flex-col gap-4 font-megalona text-sm">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 text-slate-200"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 text-slate-200"
            >
              What We Do ?
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 text-slate-200"
            >
              Customer Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-slate-200"
            >
              Contact Us
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl editorial-button font-bold text-xs uppercase tracking-wider mt-2"
            >
              Schedule Briefing
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
