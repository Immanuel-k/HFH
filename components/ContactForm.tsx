"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, Instagram, Linkedin, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [] as string[],
    budget: "₹40,000 - ₹65,000",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [leadId, setLeadId] = useState("");

  const serviceOptions = [
    "SEO & Search Growth",
    "Personal Branding",
    "Editing",
    "Web Development",
    "Marketing",
    "Graphic & UI/UX Tokens",
  ];

  const budgetOptions = [
    "₹40,000 - ₹65,000",
    "₹65,000 - ₹1,00,000",
    "₹1,00,000 - ₹1,50,000",
    "₹1,50,000 - ₹2,00,000",
    "₹2,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹3,00,000",
  ];

  const handleServiceToggle = (svc: string) => {
    if (formData.services.includes(svc)) {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== svc) });
    } else {
      setFormData({ ...formData, services: [...formData.services, svc] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setResponseMsg(data.message);
        setLeadId(data.leadId || "");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          services: [],
          budget: "₹40,000 - ₹65,000",
          message: "",
        });
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setResponseMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-megalona text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Connect with <span className="font-voguella italic text-glitter-silver text-4xl sm:text-6xl">FINALDRFT</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Unique Clean Contact Info Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card p-5 border border-white/15 flex items-center gap-4 hover:border-white/40 transition-all group shadow-md block backdrop-blur-xl"
            >
              <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-400 block">LINKEDIN</span>
                <span className="font-megalona font-bold text-white text-base group-hover:text-slate-200 transition-colors">
                  LinkedIn Profile
                </span>
              </div>
            </a>

            {/* Direct Phone / Whatsapp */}
            <a
              href="tel:8438656943"
              className="surface-card p-5 border border-white/15 flex items-center gap-4 hover:border-white/40 transition-all group shadow-md block backdrop-blur-xl"
            >
              <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-400 block">DIRECT PHONE / WHATSAPP</span>
                <span className="font-mono font-bold text-white text-sm group-hover:text-slate-200 transition-colors">
                  +91 8438656943
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:media.finaldrft@gmail.com"
              className="surface-card p-5 border border-white/15 flex items-center gap-4 hover:border-white/40 transition-all group shadow-md block backdrop-blur-xl"
            >
              <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-400 block">OFFICIAL EMAIL</span>
                <span className="font-mono font-bold text-white text-sm group-hover:text-slate-200 transition-colors">
                  media.finaldrft@gmail.com
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/finaldrft.media"
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card p-5 border border-white/15 flex items-center gap-4 hover:border-white/40 transition-all group shadow-md block backdrop-blur-xl"
            >
              <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-400 block">INSTAGRAM HANDLE</span>
                <span className="font-mono font-bold text-white text-sm group-hover:text-slate-200 transition-colors">
                  @finaldrft.media
                </span>
              </div>
            </a>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-7 surface-card p-6 sm:p-8 border-white/20 backdrop-blur-xl">
            <h3 className="font-megalona text-2xl font-bold text-white mb-6 flex items-center justify-between">
              <span>Project Specification Form</span>
              <span className="font-mono text-xs font-normal text-slate-400">SLA Response 24h</span>
            </h3>

            {status === "success" ? (
              <div className="p-8 rounded-2xl bg-white/5 border border-white/20 text-center animate-in fade-in duration-200 backdrop-blur-md">
                <CheckCircle2 className="w-14 h-14 text-white mx-auto mb-4" />
                <h4 className="font-megalona text-2xl font-bold text-white mb-2">
                  Specification Transmitted
                </h4>
                <p className="font-megalona text-slate-300 text-sm mb-4 leading-relaxed">
                  {responseMsg}
                </p>
                {leadId && (
                  <div className="inline-block px-3.5 py-1.5 rounded-full bg-black border border-white/20 font-mono text-xs text-white mb-6">
                    Reference Token: {leadId}
                  </div>
                )}
                <button
                  onClick={() => setStatus("idle")}
                  className="editorial-button w-full py-3.5 font-megalona font-bold text-sm shadow-md"
                >
                  Submit Additional Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-megalona">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="clean-input w-full px-4 py-3 text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="clean-input w-full px-4 py-3 text-sm shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="clean-input w-full px-4 py-3 text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Organization / Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Brand Name"
                      className="clean-input w-full px-4 py-3 text-sm shadow-xs"
                    />
                  </div>
                </div>

                {/* Our Expertise Row */}
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Our Expertise
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((svc, idx) => {
                      const isSelected = formData.services.includes(svc);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleServiceToggle(svc)}
                          className={`px-3 py-1.5 rounded-full text-xs font-megalona font-semibold transition-all ${
                            isSelected
                              ? "bg-white text-black border border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                              : "bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Row */}
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="clean-input w-full px-4 py-3 text-sm cursor-pointer shadow-xs text-white bg-black/90"
                  >
                    {budgetOptions.map((opt, idx) => (
                      <option key={idx} value={opt} className="bg-black text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your target milestones, expected timeline, and requirements..."
                    className="clean-input w-full px-4 py-3 text-sm shadow-xs"
                  />
                </div>

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="editorial-button w-full py-4 font-megalona font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Specification...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
