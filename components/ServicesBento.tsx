"use client";

import { useState } from "react";
import { CheckCircle, ArrowUpRight, X, Sparkles } from "lucide-react";
import ArcFlowCarousel, { SmoothSliderItem } from "@/components/ui/arc-flow-carousel";

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  shortDesc: string;
  uniqueness: string;
  badge: string;
  deliverables: string[];
  metrics: string;
  caseStudySnippet: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "seo",
    index: "01",
    title: "SEO & Search Growth Architecture",
    category: "Organic Visibility & Search",
    shortDesc: "Technical SEO audits, high-intent keyword mapping, and authority-building content pipelines to rank for decision-making search traffic.",
    uniqueness: "We target buying-intent search queries with customized semantic graph schemas rather than vanity keyword volume.",
    badge: "+340% Traffic Velocity",
    deliverables: [
      "Technical Infrastructure & Web Vitals Audit",
      "Search Intent & Keyword Taxonomy Mapping",
      "Semantic On-Page & Schema Integration",
      "High-Authority Backlink Placement",
    ],
    metrics: "Top 3 Ranking for 85%+ Target Keyword Clusters",
    caseStudySnippet: "Grew enterprise SaaS organic traffic from 5k to 140k monthly visitors in 6 months.",
  },
  {
    id: "branding",
    index: "02",
    title: "Personal Branding & Executive Presence",
    category: "Thought Leadership & Influence",
    shortDesc: "Transforming CEOs, founders, and partners into industry authorities through narrative positioning and structured thought leadership.",
    uniqueness: "Bespoke narrative voice profiling that sounds 100% authentic to the founder without standard generic AI templates.",
    badge: "10M+ Organic Reach",
    deliverables: [
      "LinkedIn & X Strategy & Voice Architecture",
      "Executive Narrative & Ghostwriting",
      "Keynote & Podcast Booking Campaign",
      "Substack Newsletter & Media Publishing",
    ],
    metrics: "Average 4x Follower Growth within 90 Days",
    caseStudySnippet: "Positioned Fintech founder resulting in $1.2M direct inbound deal flow.",
  },
  {
    id: "video",
    index: "03",
    title: "Editing",
    category: "Content Production & Motion",
    shortDesc: "Retention-first YouTube long-form videos and short-form Reels/Shorts with custom typography, motion graphics, and sound design.",
    uniqueness: "Micro-retention editing techniques with frame-by-frame pacing, custom sound design, and viral hooks.",
    badge: "50M+ Organic Views",
    deliverables: [
      "Viral Hook Scriptwriting & Storyboarding",
      "Short-Form Reels, TikToks & Shorts",
      "4K Long-Form Editing & Sound Mix",
      "Custom 2D Motion Graphics & Intros",
    ],
    metrics: "78% Average Retention Rate Across Channels",
    caseStudySnippet: "Edited 120+ viral videos generating over 50M total organic views.",
  },
  {
    id: "webdev",
    index: "04",
    title: "Web Development",
    category: "Engineering & Custom Apps",
    shortDesc: "High-speed Next.js, React, and Node.js web applications built for reliability, accessibility, and conversion.",
    uniqueness: "Clean, ultra-fast code built on modern Next.js App Router with sub-500ms load times and zero bloat.",
    badge: "<0.5s Load Speed",
    deliverables: [
      "Next.js App Router & React Architecture",
      "Full-Stack Node.js & Python API Services",
      "E-Commerce & SaaS Product Development",
      "Database & Headless CMS Integrations",
    ],
    metrics: "100/100 Lighthouse Performance Index",
    caseStudySnippet: "Reengineered custom web platform driving a 42% increase in checkout conversions.",
  },
  {
    id: "social",
    index: "05",
    title: "Marketing",
    category: "Distribution & Community",
    shortDesc: "Comprehensive multi-channel scheduling, editorial calendars, community engagement, and performance reporting.",
    uniqueness: "Data-driven editorial scheduling paired with active community management that converts passive viewers into advocates.",
    badge: "End-to-End Management",
    deliverables: [
      "Multi-Channel Publishing Calendar",
      "Community Engagement & Response Protocols",
      "Paid Campaign Creative & Copy",
      "Monthly Growth Analytics & Insights",
    ],
    metrics: "+250% Engagement Rate Improvement",
    caseStudySnippet: "Managed full social suite resulting in 3x community growth over 4 months.",
  },
  {
    id: "uiux",
    index: "06",
    title: "Graphic Design & UI/UX Token Systems",
    category: "Design Systems & Product Design",
    shortDesc: "Pixel-perfect Figma design tokens, scalable component libraries, and visual guidelines that align brand identity with user experience.",
    uniqueness: "Multi-layered design token architecture built for seamless developer handoff and high contrast accessibility.",
    badge: "Tokens & Prototypes",
    deliverables: [
      "Figma UI/UX Component & Token Systems",
      "Interactive High-Fidelity Prototypes",
      "Brand Identity Guidelines & Manuals",
      "Marketing Collateral & Banners",
    ],
    metrics: "100% WCAG 2.1 AAA Accessibility Compliant",
    caseStudySnippet: "Designed comprehensive UI system adopted across 4 client product lines.",
  },
];

export default function ServicesBento() {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  // Map 6 services into custom Fan Cards preserving exact frosted glass styling
  const fanCards: SmoothSliderItem[] = servicesData.map((service) => ({
    id: service.id,
    content: (
      <div className="surface-card group p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 hover:border-white/50 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] flex flex-col justify-between h-[390px] sm:h-[430px] bg-black/90 backdrop-blur-xl border border-white/15">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 block mb-3">
            {service.category}
          </span>

          <h3 className="font-megalona text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-slate-200 transition-colors">
            {service.title}
          </h3>

          <p className="font-megalona text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
            {service.shortDesc}
          </p>

          {/* Uniqueness Highlight Box */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-megalona mb-4 backdrop-blur-md">
            <span className="font-mono text-[9px] uppercase font-bold text-slate-300 flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-slate-300" /> Our Edge:
            </span>
            <p className="text-slate-200 font-medium line-clamp-2">{service.uniqueness}</p>
          </div>
        </div>

        <div>
          <div className="space-y-1.5 pt-3 border-t border-white/10 mb-4">
            {service.deliverables.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 font-megalona text-[11px] text-slate-300">
                <CheckCircle className="w-3 h-3 text-slate-300 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] font-semibold text-white group-hover:text-slate-200 transition-colors">
            <span>Explore Specification</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-slate-300" />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section id="services" className="py-20 text-white relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="font-megalona text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            What We Do <span className="font-voguella italic text-glitter-silver text-4xl sm:text-6xl inline-block ml-1 px-3 py-1 overflow-visible leading-none">?</span>
          </h2>
        </div>

        {/* Arc Flow Carousel with 6 Service Cards */}
        <ArcFlowCarousel
          items={fanCards}
          radiusRatio={0.85}
          cardRatio={0.24}
          minCardWidth={240}
          maxCardWidth={330}
          cardAspect={0.62}
          overlap={-0.04}
          arcOffset={0.5}
          smoothing={5.5}
          dragSensitivity={1.2}
          momentum={1}
          snap={false}
          wheelControl="horizontal"
          autoRotateSpeed={0.12}
          pauseOnHover
          surfaceColor="#000000"
          onCardClick={(_, idx) => setActiveModal(servicesData[idx])}
        />
      </div>

      {/* Modal Detail */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="surface-card relative w-full max-w-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/20 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                {activeModal.category}
              </span>
            </div>

            <h3 className="font-megalona text-3xl font-bold text-white mb-4">
              {activeModal.title}
            </h3>

            <p className="font-megalona text-sm text-slate-300 mb-6 leading-relaxed">
              {activeModal.shortDesc}
            </p>

            {/* Uniqueness Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 mb-6 shadow-md backdrop-blur-md">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4" /> Our Specific Uniqueness & Edge
              </span>
              <p className="font-megalona text-sm font-semibold text-white leading-relaxed">
                {activeModal.uniqueness}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
                Deliverables & Scope
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModal.deliverables.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 font-megalona text-xs text-slate-200 flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <span className="font-mono text-xs font-bold text-slate-300 block mb-1">
                Verified Outcome Benchmark
              </span>
              <p className="font-megalona text-sm font-semibold text-white mb-1">
                {activeModal.metrics}
              </p>
              <p className="font-megalona text-xs text-slate-400">
                {activeModal.caseStudySnippet}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={() => setActiveModal(null)}
                className="editorial-button flex-1 text-center py-3.5 font-megalona font-bold text-xs shadow-md"
              >
                Inquire Regarding {activeModal.title.split(" ")[0]}
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-3.5 rounded-full bg-white/10 text-white font-megalona font-semibold text-xs border border-white/20 hover:bg-white/20 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
