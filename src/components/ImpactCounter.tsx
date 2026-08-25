import React from 'react';
import { ShieldCheck, HeartHandshake, Award, CheckCircle2 } from 'lucide-react';
import { Card3D } from './Card3D';

export const ImpactCounter: React.FC = () => {
  const highlights = [
    {
      label: 'Zero Admin Fee',
      value: '100%',
      desc: 'All contributions directly fund food, study kits, and animal care.'
    },
    {
      label: 'Ground Actions',
      value: 'Daily',
      desc: 'Consistent daily night food distribution runs across Paramakudi.'
    },
    {
      label: 'Youth Network',
      value: 'Grassroots',
      desc: 'Driven entirely by compassionate local student & youth volunteers.'
    }
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, idx) => (
            <Card3D key={idx} className="p-6 text-center group">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800 flex items-center justify-center text-red-500 mx-auto mb-4 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                {idx === 0 ? <ShieldCheck className="w-6 h-6" /> : idx === 1 ? <HeartHandshake className="w-6 h-6" /> : <Award className="w-6 h-6" />}
              </div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-white mb-1">
                {item.value}
              </div>
              <div className="font-heading font-bold text-sm text-red-400 uppercase tracking-wider mb-2">
                {item.label}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center space-x-2 text-[11px] font-semibold text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>100% Selfless & Volunteer Executed</span>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Financial Transparency & Trust Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0c0c0f] via-slate-900 to-[#0c0c0f]">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Direct Field Dedication</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Hands for Homeless operates with complete transparency and zero administrative fee. Every drive is led directly by dedicated local youth volunteers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
