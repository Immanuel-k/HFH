import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { ContactMessage } from '../types';
import { Card3D } from './Card3D';
import { TactileButton } from './TactileButton';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // 1. Submit via apiService (FormSubmit email to handsforhomeless7@gmail.com + mailto)
      const res = await apiService.sendContactMessage(formData);
      setSuccessMsg(res.message);

      // 2. Format pre-filled WhatsApp dispatch to +91 9344516020
      const waText = encodeURIComponent(
        `*NEW WEBSITE INQUIRY - HFH*\n` +
        `----------------------------------\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone || 'N/A'}\n` +
        `*Subject:* ${formData.subject || 'General Inquiry'}\n` +
        `*Message:* ${formData.message}\n` +
        `----------------------------------`
      );
      const waUrl = `https://wa.me/919344516020?text=${waText}`;

      // Automatically launch WhatsApp with prefilled message
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

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
            Reach out via direct WhatsApp (+91 9344516020) or email (handsforhomeless7@gmail.com) for food drives, tuition centers, or animal welfare support.
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

                <a
                  href="tel:+919344516020"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-red-600/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">PHONE / CONTACT NUMBER</span>
                    <span className="text-base font-mono font-bold text-white group-hover:text-red-400 transition-colors whitespace-nowrap">+91 9344516020</span>
                  </div>
                </a>

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

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <h3 className="font-heading font-bold text-2xl text-white mb-1">Send us a Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Submitting this form sends your message directly to <strong className="text-red-400">handsforhomeless7@gmail.com</strong> and opens WhatsApp to <strong className="text-emerald-400">+91 9344516020</strong>.
              </p>

              {successMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs sm:text-sm flex items-start space-x-3 shadow-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white mb-0.5">Message Sent Successfully!</span>
                    <span>{successMsg}</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border border-red-800 text-red-300 text-xs sm:text-sm">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sundar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sundar@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 9344516020"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="General Inquiry"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    MESSAGE *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message or inquiry here..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  ></textarea>
                </div>

                <TactileButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message (Gmail & WhatsApp)</span>
                    </>
                  )}
                </TactileButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
