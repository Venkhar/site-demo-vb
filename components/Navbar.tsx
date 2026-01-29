'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-20 px-6 lg:px-16 flex items-center justify-between transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-lambo-black/90' : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <LamborghiniLogo className="w-10 h-10 text-lambo-purple" />
        <span className="font-orbitron text-xl md:text-2xl font-bold text-lambo-purple tracking-wider">
          TEMERARIO
        </span>
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 md:px-6 py-2 md:py-3 border-2 border-lambo-teal text-lambo-teal hover:bg-lambo-teal hover:text-black transition-all duration-300 font-rajdhani font-semibold tracking-wider text-sm md:text-base"
      >
        CONFIGURE
      </motion.button>
    </motion.nav>
  );
}

function LamborghiniLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      {/* Shield shape */}
      <path
        d="M50 5 L90 25 L90 60 Q90 85 50 95 Q10 85 10 60 L10 25 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Bull silhouette simplified */}
      <path
        d="M30 55 Q35 45 50 45 Q65 45 70 55 L65 60 Q55 55 50 55 Q45 55 35 60 Z"
        fill="currentColor"
      />
      <circle cx="35" cy="50" r="3" fill="currentColor" />
      <circle cx="65" cy="50" r="3" fill="currentColor" />
      {/* Horns */}
      <path
        d="M25 45 Q30 35 35 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M75 45 Q70 35 65 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
