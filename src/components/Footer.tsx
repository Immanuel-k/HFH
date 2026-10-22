import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, Send, MessageCircle, Instagram } from 'lucide-react';
import { TactileButton } from './TactileButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#030305] border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="HFH Logo" className="w-11 h-11 rounded-full border border-red-600/40 object-cover" />
              <div>
                <span className="font-heading font-black text-lg text-white">HANDS FOR HOMELESS</span>
                <div className="text-xs text-red-400 font-bold font-tamil leading-none mt-0.5 whitespace-nowrap">"கற்றது சமத்துவம்"</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Hands for Homeless (HFH) is an independent, non-profit organization dedicated to zero hunger, youth education, women empowerment, and stray animal welfare in Paramakudi Taluk and Ramanathapuram District, Tamil Nadu.
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Paramakudi Taluk, Ramanathapuram District, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} className="hover:text-red-400 transition-colors">About HFH & Mission</a></li>
              <li><a href="#pillars" onClick={(e) => { e.preventDefault(); handleNavClick('#pillars'); }} className="hover:text-red-400 transition-colors">Our 4 Core Mission Pillars</a></li>
              <li><a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }} className="hover:text-red-400 transition-colors">Ground Reality Gallery</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="hover:text-red-400 transition-colors">Direct Contact & Helpline</a></li>
            </ul>
          </div>

          {/* Direct Support & High-Quality Social Icons Only */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
                Direct Contact
              </h4>

              {/* High-Quality Merged Icon-Only WhatsApp & Instagram Buttons */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://wa.me/919344516020"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp Chat"
                  title="WhatsApp: +91 9344516020"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-400 hover:scale-110 shadow-lg shadow-emerald-950/50 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/hands.forhomeless?igsi=MWhjM2xub2hsNzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Official Instagram Page"
                  title="Instagram: @hands.forhomeless"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-950/80 via-purple-950/80 to-red-950/80 border border-pink-500/60 text-pink-400 hover:from-pink-600 hover:to-purple-600 hover:text-white hover:border-pink-400 hover:scale-110 shadow-lg shadow-pink-950/50 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="space-y-2.5">
              <a href="tel:+919344516020" className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200 hover:text-white whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>+91 9344516020</span>
              </a>

              <a href="mailto:handsforhomeless7@gmail.com" className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>handsforhomeless7@gmail.com</span>
              </a>
            </div>

            <TactileButton
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => handleNavClick('#contact')}
            >
              <Send className="w-4 h-4" />
              <span>Contact HFH Team</span>
            </TactileButton>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Hands for Homeless (HFH)</strong>. Paramakudi, Ramanathapuram. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-600 transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
