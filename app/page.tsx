'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import TemerarioScrollCanvas from '@/components/TemerarioScrollCanvas';
import TemerarioExperience from '@/components/TemerarioExperience';
import SpecsGrid from '@/components/SpecsGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // SINGLE SOURCE OF TRUTH - Only scroll hook in entire app
  // This prevents desync between components
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main className="bg-lambo-black min-h-screen">
      <Navbar />

      {/* SCROLL SEQUENCE SECTION - 600vh container */}
      {/* User scrolls through 600vh but viewport stays locked in place */}
      <section ref={containerRef} className="h-[600vh] relative">
        {/* Sticky viewport - locks in place while user scrolls */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* Background canvas layer (z-0) */}
          <TemerarioScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
            imageFolderPath="/images/temerario-sequence/"
          />

          {/* HUD overlay layer (z-10) */}
          <TemerarioExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* STATIC CONTENT - Scrolls naturally after sequence completes */}
      <div className="relative z-20 bg-lambo-black">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
