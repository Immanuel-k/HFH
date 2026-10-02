"use client";

import ParticleWave from "@/components/ui/particle-wave";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden text-white bg-black">
      {/* Background Interactive Three.js Particle Wave Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-90">
        <ParticleWave theme="dark" particleColorHex={0xE2E8F0} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline - FROM ORDINARY TO AUTHORITY */}
          <h1 className="font-megalona text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-8 uppercase text-glitter-white">
            FROM ORDINARY TO{" "}
            <span className="font-calligraphy text-glitter-silver text-6xl sm:text-8xl lg:text-9xl tracking-normal normal-case block sm:inline mt-2 sm:mt-0 font-normal pr-4 overflow-visible">
              Authority.
            </span>
          </h1>

          {/* Subtitle in BD Megalona Font Style */}
          <p className="font-megalona text-lg sm:text-xl text-slate-300 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
            We partner with ambitious founders and brands through high-converting{" "}
            <strong className="text-white font-semibold">SEO growth</strong>, executive{" "}
            <strong className="text-white font-semibold">Personal Branding</strong>, viral{" "}
            <strong className="text-white font-semibold">Editing</strong>, custom{" "}
            <strong className="text-white font-semibold">Web Development</strong>, and{" "}
            <strong className="text-white font-semibold">UI/UX Systems</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
