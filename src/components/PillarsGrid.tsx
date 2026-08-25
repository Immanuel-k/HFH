import React, { useState, useEffect } from 'react';
import {
  Utensils,
  GraduationCap,
  Sparkles,
  Dog,
  ArrowRight,
  X,
  Mail
} from 'lucide-react';
import { MissionPillar } from '../types';
import { Card3D } from './Card3D';
import { TactileButton } from './TactileButton';

export const pillarsData: MissionPillar[] = [
  {
    id: 'no-hunger',
    title: 'Zero Hunger & Food Distribution',
    tamilTitle: 'பசி இல்லா உலகம்',
    tagline: '',
    description: 'We organize daily food distribution drives across Paramakudi and Ramanathapuram, ensuring that elderly destitute citizens, homeless individuals, and daily wage workers receive hot, hygienic, and nutritious meals.',
    iconName: 'Utensils',
    stats: '',
    activities: [],
    image: '/hunger.jpg'
  },
  {
    id: 'education',
    title: 'Karpi',
    tamilTitle: 'கல்வி அதிகாரம்',
    tagline: '',
    description: 'Empowering children from economically backward backgrounds with free evening tuition centers, study kits, uniforms, and mentorship to prevent school dropouts and foster bright futures.',
    iconName: 'GraduationCap',
    stats: '',
    activities: [],
    image: '/education.jpg'
  },
  {
    id: 'women-empowerment',
    title: 'Kalaikural',
    tamilTitle: 'பயிற்சி வகுப்பு',
    tagline: '',
    description: 'Empowering children and youth through creative art workshops, drawing drives, handicraft skills, and community learning activities.',
    iconName: 'Sparkles',
    stats: '',
    activities: [],
    image: '/kalaikural.jpg'
  },
  {
    id: 'animal-activism',
    title: 'Animal Welfare & Rescue',
    tamilTitle: 'விலங்கு பாதுகாப்பு',
    tagline: '',
    description: 'Stray dogs, cattle, and injured animals deserve empathy. HFH runs daily stray feeding drives, emergency injury treatments, and rabies vaccination awareness camps.',
    iconName: 'Dog',
    stats: '',
    activities: [],
    image: '/animals.jpg'
  }
];

export const PillarsGrid: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<MissionPillar | null>(null);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (selectedPillar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPillar]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Dog': return <Dog className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleContactAction = () => {
    setSelectedPillar(null);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pillars" className="py-24 relative z-10 bg-[#07070a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Core Mission Pillars</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Social Transformation in <span className="text-red-500">Tamil Nadu</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From daily food distribution to Karpi education, Kalaikural art drives, and stray animal welfare, explore how Hands for Homeless makes a direct impact.
          </p>
        </div>

        {/* 4 Core Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarsData.map((pillar) => (
            <Card3D
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar)}
              className="p-6 flex flex-col justify-between group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Icon & Tamil Title */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-red-950/40">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="text-xs font-bold text-red-400 bg-red-950/40 border border-red-900/30 px-3 py-1 rounded-full font-tamil">
                    {pillar.tamilTitle}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-400 transition-colors mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
                <span className="text-xs font-bold text-red-400 flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Pillar <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </Card3D>
          ))}
        </div>
      </div>

      {/* Pillar Detail Modal */}
      {selectedPillar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-hidden"
          onClick={() => setSelectedPillar(null)}
        >
          <div
            className="glass-panel-glow max-w-3xl w-full rounded-3xl overflow-hidden border border-red-600/40 relative max-h-[90vh] flex flex-col bg-[#0c0c0f]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prominent High-Visibility Close Button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-2xl flex items-center justify-center space-x-1.5 hover:scale-105 transition-all cursor-pointer border border-white/30"
              aria-label="Close modal"
              title="Close Popup"
            >
              <X className="w-5 h-5 shrink-0" />
              <span className="text-xs font-extrabold uppercase tracking-wider hidden sm:inline">Close</span>
            </button>

            {/* Uncropped Full Image View Header */}
            <div className="relative w-full max-h-[48vh] bg-black/95 flex items-center justify-center p-3 rounded-t-3xl overflow-hidden shrink-0">
              <img
                src={selectedPillar.image}
                alt={selectedPillar.title}
                className="max-h-[44vh] w-auto max-w-full object-contain rounded-2xl shadow-xl"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto bg-[#0c0c0f]">
              <div className="flex items-center space-x-3">
                <span className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-tamil">
                  {selectedPillar.tamilTitle}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {selectedPillar.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedPillar.description}
              </p>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <TactileButton
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  onClick={handleContactAction}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Us regarding {selectedPillar.title}</span>
                </TactileButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
