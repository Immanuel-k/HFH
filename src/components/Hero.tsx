import React from 'react';
import { Compass, Shield, Users, ArrowRight, Award, MapPin, Mail } from 'lucide-react';
import { TactileButton } from './TactileButton';

export const Hero: React.FC = () => {
  const floatingTags = [
    { label: 'Empathy', top: '18%', left: '10%', delay: '0s' },
    { label: 'Community', top: '24%', right: '12%', delay: '1s' },
    { label: 'Social Welfare', bottom: '28%', left: '12%', delay: '2s' },
    { label: 'Support', bottom: '32%', right: '10%', delay: '1.5s' }
  ];

  const handleScrollTo = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient red lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Floating 3D Node Labels */}
      {floatingTags.map((tag, idx) => (
        <div
          key={idx}
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
            animationDelay: tag.delay
          }}
          className="hidden lg:flex absolute items-center space-x-2 glass-panel px-4 py-2 rounded-full border border-red-500/25 shadow-lg shadow-red-950/30 animate-float text-xs font-bold text-slate-300 z-10 hover:border-red-500/60 transition-colors select-none"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>{tag.label}</span>
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        {/* NGO Location Badge */}
        <div className="inline-flex items-center space-x-2.5 glass-panel px-5 py-2 rounded-full border border-red-500/35 mb-8 shadow-lg shadow-red-950/20">
          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
            Paramakudi • Ramanathapuram, Tamil Nadu
          </span>
        </div>

        {/* High Impact Headline: " கற்றது சமத்துவம் " */}
        <h1 className="font-tamil font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-tight mb-6">
          <span className="bg-gradient-to-r from-white via-red-300 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(229,9,20,0.5)]">
            "கற்றது சமத்துவம்"
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          From Paramakudi Taluk to the World: <strong className="text-white font-bold">Hands for Homeless (HFH)</strong> is an independent, 
          selfless non-profit NGO dedicated to zero hunger, youth education, women empowerment, and stray animal welfare.
        </p>

        {/* Dual Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <TactileButton
            variant="primary"
            size="lg"
            hapticType="heavy"
            onClick={() => handleScrollTo('#pillars')}
            className="w-full sm:w-auto"
          >
            <Compass className="w-5 h-5 text-white" />
            <span>Explore 4 Core Pillars</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </TactileButton>

          <TactileButton
            variant="glass"
            size="lg"
            hapticType="medium"
            onClick={() => handleScrollTo('#contact')}
            className="w-full sm:w-auto"
          >
            <Mail className="w-5 h-5 text-red-500" />
            <span>Get in Touch</span>
          </TactileButton>
        </div>

        {/* Qualitative Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="glass-panel p-4.5 rounded-2xl border border-slate-800/90 text-left flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800/50 text-red-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white"></Equality></div>
              <div className="text-xs text-slate-400"></div>
              <div className="text-sm font-bold text-white">Youth Driven</div>
              <div className="text-xs text-slate-400"></div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 text-left flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800/50 text-red-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Daily Meal Runs</div>
              <div className="text-xs text-slate-400">Zero Hunger Goal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
