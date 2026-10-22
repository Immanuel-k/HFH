import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Users } from 'lucide-react';
import { Card3D } from './Card3D';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative z-10 bg-[#07070a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Outreach & Contact</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Get in Touch with <span className="text-red-500">HFH</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Reach out via direct WhatsApp (+91 9344516020), call us, or connect with our leadership team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card3D className="p-8 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  Hands for Homeless (HFH)
                </h3>
                <p className="text-xs text-red-400 font-bold font-tamil leading-none">
                  "கற்றது சமத்துவம்"
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/919344516020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider block">OFFICIAL WHATSAPP</span>
                    <span className="text-base font-mono font-bold text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">+91 9344516020</span>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-red-600/50 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">PHONE / CONTACT NUMBERS</span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-base font-mono font-bold text-white">
                      <a href="tel:+919344516020" className="hover:text-red-400 transition-colors whitespace-nowrap">+91 9344516020</a>
                      <span className="hidden sm:inline text-slate-600">•</span>
                      <a href="tel:+919043032347" className="hover:text-red-400 transition-colors whitespace-nowrap">+91 9043032347</a>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:handsforhomeless7@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-red-600/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">DIRECT GMAIL</span>
                    <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">handsforhomeless7@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">HEADQUARTERS & REGION</span>
                    <span className="text-sm font-bold text-white">Paramakudi Taluk, Ramanathapuram District</span>
                    <span className="text-xs text-slate-400 block">Tamil Nadu, India</span>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Meet Our Founders & Google Form Redirect */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 px-3 py-1 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Users className="w-3.5 h-3.5" />
                  <span>Leadership</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  Meet our founders
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Dedicated grassroots leadership turning empathy into concrete action across Ramanathapuram.
                </p>
              </div>

              {/* Founders Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-red-600/40 transition-colors">
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest block mb-1">FOUNDER</span>
                  <h4 className="text-xl font-bold text-white">Tamiliniyan</h4>
                  <p className="text-xs text-slate-400 mt-1">Hands for Homeless (HFH)</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-red-600/40 transition-colors">
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest block mb-1">CO-FOUNDER</span>
                  <h4 className="text-xl font-bold text-white">Prasanna</h4>
                  <p className="text-xs text-slate-400 mt-1">Hands for Homeless (HFH)</p>
                </div>
              </div>

              {/* Redirect to Google Form in New Tab */}
              <div className="pt-2">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-950/80 to-slate-950 border border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-white text-sm">Join as a Volunteer</h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Ready to make a difference? Fill out our official Google Form.
                    </p>
                  </div>
                  <a
                    href="https://forms.gle/AwdwARnoahwfyHgS6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-red-950/50 hover:scale-[1.02]"
                  >
                    <span>Open Registration Form</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
