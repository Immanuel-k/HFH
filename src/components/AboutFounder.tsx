import React from 'react';
import { Target, Eye, ShieldCheck, User, CheckCircle2 } from 'lucide-react';
import { Card3D } from './Card3D';

export const AboutFounder: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <User className="w-3.5 h-3.5" />
            <span>Founding Vision & Roots</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Driven by Compassion, Guided by <span className="text-red-500">Equality</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Founded in Paramakudi Taluk, Ramanathapuram District, Hands for Homeless (HFH) stands as a beacon of hope for the underserved.
          </p>
        </div>

        {/* Founder & Org Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <Card3D className="p-2">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-black p-6 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <img src="/logo.jpg" alt="HFH Emblem" className="w-12 h-12 rounded-xl border border-red-500/40 object-cover" />
                    <div>
                      <div className="text-white font-bold text-base">HANDS FOR HOMELESS</div>
                      <div className="text-xs text-red-400 font-bold font-tamil">" கற்றது சமத்துவம் "</div>
                    </div>
                  </div>
                  <span className="bg-red-600/20 text-red-400 text-xs font-bold px-2.5 py-1 rounded-full border border-red-500/30">NGO</span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">ORGANIZATION</span>
                    <h3 className="text-xl font-bold text-white">Hands for Homeless (HFH)</h3>
                    <p className="text-xs text-red-400 mt-0.5">Paramakudi Taluk, Ramanathapuram District, Tamil Nadu</p>
                  </div>

                  <p className="leading-relaxed text-xs sm:text-sm text-slate-300 italic">
                    "True equality begins when no child sleeps hungry, no student drops out for lack of guidance, and no animal suffers in silence. HFH was born to turn empathy into concrete action."
                  </p>

                  <div className="pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 shrink-0" />
                      <span>100% Volunteer Driven</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 shrink-0" />
                      <span>Zero Admin Overhead</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 shrink-0" />
                      <span>Grassroots Transparency</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 shrink-0" />
                      <span>Direct Field Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Glowing Ambient Ring */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="font-heading font-bold text-2xl text-white">
                The Story Behind <span className="text-red-500">Hands for Homeless (HFH)</span>
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                In the heart of Paramakudi Taluk, Ramanathapuram District, <strong className="text-white">Hands for Homeless (HFH)</strong> was established to address the daily struggles of destitute individuals, underprivileged children lacking educational resources, and neglected stray animals. Driven by a deep sense of social responsibility, HFH stands as an independent, non-profit NGO dedicated to restoring dignity and self-reliance.
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-900/40">
                <div className="text-red-400 font-bold text-sm mb-1 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  Our Core Principle: "கற்றது சமத்துவம்" (Equality Through Learning)
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  We believe that education and awareness are the greatest equalizers. By providing nutritious food to sustain the body and education to empower the mind, HFH fosters long-term social upliftment.
                </p>
              </div>

              {/* Vision & Mission Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-red-900/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center text-red-500 mb-3 border border-red-800/40">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Our Mission</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Eradicate hunger, offer free remedial tutoring to underprivileged children, provide skill development for women, and rescue stray animals across Ramanathapuram.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-red-900/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center text-red-500 mb-3 border border-red-800/40">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Our Vision</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A self-sustaining society where basic needs are guaranteed, women are financially independent, children thrive in education, and compassion extends to all living beings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
