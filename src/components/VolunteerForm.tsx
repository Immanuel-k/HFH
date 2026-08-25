import React, { useState } from 'react';
import { UserCheck, Send, CheckCircle2, Loader2, HeartHandshake } from 'lucide-react';
import { apiService } from '../services/api';
import { VolunteerRequest } from '../types';
import { TactileButton } from './TactileButton';

export const VolunteerForm: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerRequest>({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    skills: [],
    availability: 'weekends',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredId, setRegisteredId] = useState('');

  const skillOptions = [
    'Food Prep & Distribution',
    'Evening Teaching / Tutoring',
    'Stray Animal Feeding & Care',
    'Women Tailoring Mentorship',
    'Social Media & Photography',
    'Medical & Eye Camp Support'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // 1. Submit via apiService
      const res = await apiService.registerVolunteer(formData);
      setSuccessMsg(res.message);
      setRegisteredId(res.volunteerId);

      // 2. Format direct email dispatch to handsforhomeless7@gmail.com
      const emailSubject = encodeURIComponent(`[NEW VOLUNTEER REGISTRATION] ${formData.fullName} - ${formData.location || 'Paramakudi'}`);
      const emailBody = encodeURIComponent(
        `VOLUNTEER REGISTRATION DETAILS:\n` +
        `----------------------------------------\n` +
        `Full Name: ${formData.fullName}\n` +
        `Phone Number: ${formData.phone}\n` +
        `Email Address: ${formData.email}\n` +
        `Location/Taluk: ${formData.location || 'Not Specified'}\n` +
        `Availability: ${formData.availability}\n` +
        `Selected Skills: ${formData.skills.length > 0 ? formData.skills.join(', ') : 'General Volunteer'}\n` +
        `Additional Message: ${formData.message || 'Ready to serve!'}\n` +
        `----------------------------------------\n` +
        `Volunteer ID Assigned: ${res.volunteerId}\n` +
        `Sent via Official HFH Web Portal`
      );

      const mailtoUrl = `mailto:handsforhomeless7@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Automatically launch pre-filled email client to dispatch to handsforhomeless7@gmail.com
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);

      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        location: '',
        skills: [],
        availability: 'weekends',
        message: ''
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="volunteer" className="py-24 relative z-10 bg-[#07070a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Volunteer Call to Action Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Youth Volunteer Movement</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Turn Your Empathy into <span className="text-red-500">Direct Ground Action</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hands for Homeless is powered 100% by passionate students, youth, and local citizens of Ramanathapuram. Join our daily night food distribution runs, evening tuition centers, or animal rescue drives.
            </p>

            <div className="space-y-3 pt-2">
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Direct Mail Notification</h4>
                  <p className="text-xs text-slate-400">Applications are sent directly to <strong className="text-white">handsforhomeless7@gmail.com</strong>.</p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Volunteer Certificate</h4>
                  <p className="text-xs text-slate-400">Official appreciation certificate issued by Hands for Homeless (HFH).</p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Community & Brotherhood</h4>
                  <p className="text-xs text-slate-400">Join a network of compassionate youth volunteers in Tamil Nadu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Registration Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
              <h3 className="font-heading font-bold text-2xl text-white mb-2 flex items-center">
                <HeartHandshake className="w-6 h-6 text-red-500 mr-2" />
                Volunteer Registration Form
              </h3>
              <p className="text-xs text-slate-400 mb-8">
                Fill in your details. Submitting this form automatically formats and sends your application to handsforhomeless7@gmail.com.
              </p>

              {successMsg && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs sm:text-sm flex items-start space-x-3 shadow-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white mb-1">Registration Complete ({registeredId})!</span>
                    <span>{successMsg}</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border border-red-800 text-red-300 text-xs sm:text-sm">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sundar Raman"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9344516020"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
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

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Location / Taluk
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Paramakudi / Ramanathapuram"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Skill Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    How would you like to contribute? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {skillOptions.map((skill) => {
                      const selected = formData.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                            selected
                              ? 'bg-red-950/90 border-red-600 text-red-300'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>{skill}</span>
                          {selected && <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Why do you want to join HFH? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly about your motivation..."
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
                      <span>Register & Email Application to HFH</span>
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
