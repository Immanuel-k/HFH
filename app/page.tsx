import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Home() {
  return (
    <div className="relative w-full bg-black text-white antialiased selection:bg-white/20 overflow-x-hidden">
      {/* 
        MAIN CONTENT AREA (Curtain Layer)
        Higher z-index layer that covers the fixed footer until the user 
        scrolls past the end of the Contact/Inquire form section.
      */}
      <main className="relative z-10 w-full min-h-screen bg-black border-b border-white/15 shadow-2xl rounded-b-[2.5rem]">
        <Navbar />
        <Hero />
        <ServicesBento />
        <Testimonials />
        <ContactForm />
      </main>

      {/* 
        CINEMATIC MOTION FOOTER 
        Reveals smoothly underneath the main content curtain right after 
        the Project Specification Form / Inquire section.
      */}
      <CinematicFooter />
    </div>
  );
}
