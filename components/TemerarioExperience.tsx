'use client';

import { MotionValue, useTransform, motion } from 'framer-motion';
import { temerarioData } from '@/data/carData';

interface TemerarioExperienceProps {
  scrollYProgress: MotionValue<number>;
}

const customEase: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export default function TemerarioExperience({
  scrollYProgress,
}: TemerarioExperienceProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <HeroPhase scrollYProgress={scrollYProgress} />
      <DesignPhase scrollYProgress={scrollYProgress} />
      <PowertrainPhase scrollYProgress={scrollYProgress} />
      <ScrollIndicator scrollYProgress={scrollYProgress} />
    </div>
  );
}

function HeroPhase({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.25, 0.30], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.30], [30, -30]);
  const scale = useTransform(scrollYProgress, [0.25, 0.30], [1, 0.95]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4"
    >
      {/* Power Badge - Top Right */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: customEase }}
        className="absolute top-24 right-4 md:right-16"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-lambo-teal/20 blur-xl rounded-full" />
          <div className="relative bg-lambo-black/80 border border-lambo-teal/50 px-4 py-2 md:px-6 md:py-3">
            <span className="font-orbitron text-2xl md:text-4xl font-black text-lambo-teal glow-teal">
              920 CV
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Title */}
      <div className="text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-wider"
        >
          <span className="text-gradient-purple">LAMBORGHINI</span>
        </motion.h1>
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: customEase }}
          className="font-orbitron text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mt-2 tracking-widest"
        >
          TEMERARIO
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: customEase }}
          className="font-rajdhani text-lg sm:text-xl md:text-2xl text-white/70 mt-4 md:mt-6 tracking-wider"
        >
          {temerarioData.tagline}
        </motion.p>
      </div>

      {/* CTA Button - Bottom Center */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: customEase }}
        className="absolute bottom-24 md:bottom-32"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto relative group px-8 py-4 bg-lambo-purple text-white font-rajdhani font-bold text-lg tracking-wider glow-purple"
        >
          <span className="relative z-10">CONFIGURE YOURS</span>
          <div className="absolute inset-0 bg-gradient-to-r from-lambo-purple to-lambo-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function DesignPhase({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.30, 0.36, 0.60, 0.66], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.30, 0.66], [50, -50]);

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: customEase,
      },
    }),
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center px-4 md:px-16"
    >
      <div className="max-w-xl">
        {/* Section Title */}
        <motion.div className="relative mb-8">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-lambo-purple to-transparent" />
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white tracking-wider">
            DESIGN
          </h2>
          <p className="font-rajdhani text-lg md:text-xl text-lambo-teal mt-2 tracking-wider">
            FORGED IN INNOVATION
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-4">
          {temerarioData.design.highlights.map((highlight, i) => (
            <motion.div
              key={highlight}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={itemVariants}
              className="flex items-center gap-4 group"
            >
              {/* Hexagon bullet */}
              <div className="w-3 h-3 bg-lambo-teal hexagon-clip group-hover:scale-125 transition-transform" />
              <span className="font-rajdhani text-lg md:text-xl text-white/90 tracking-wide group-hover:text-lambo-teal transition-colors">
                {highlight}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-lambo-purple/50 to-transparent" />
          <HexagonBorder className="w-8 h-8 text-lambo-purple/30" />
        </div>
      </div>
    </motion.div>
  );
}

function PowertrainPhase({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.66, 0.72, 0.95, 1.0], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0.66, 1.0], [50, -20]);

  const specs = [
    { label: 'Engine', value: temerarioData.specs.engine.type },
    { label: 'Power', value: temerarioData.specs.engine.power },
    { label: 'Torque', value: temerarioData.specs.engine.torque },
    { label: 'Acceleration', value: `${temerarioData.specs.performance.acceleration} (0-100)` },
    { label: 'Top Speed', value: temerarioData.specs.performance.topSpeed },
  ];

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-end px-4 md:px-16 tech-grid"
    >
      <div className="max-w-lg">
        {/* Section Title */}
        <motion.div className="relative mb-8 text-right">
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white tracking-wider">
            HYBRID
          </h2>
          <h3 className="font-orbitron text-2xl md:text-4xl font-bold text-lambo-purple tracking-wider">
            POWERTRAIN
          </h3>
          <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-lambo-teal to-transparent" />
        </motion.div>

        {/* Specs Grid */}
        <div className="space-y-3">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: customEase,
              }}
              className="flex items-center justify-between gap-4 p-3 bg-lambo-black/60 border border-carbon-light hover:border-lambo-purple/50 transition-colors group"
            >
              <span className="font-rajdhani text-sm md:text-base text-white/60 uppercase tracking-wider">
                {spec.label}
              </span>
              <span className="font-orbitron text-base md:text-lg font-bold text-lambo-teal group-hover:glow-teal transition-shadow">
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Transmission info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-right"
        >
          <p className="font-rajdhani text-sm text-white/40 tracking-wider">
            {temerarioData.specs.transmission} | {temerarioData.specs.drivetrain}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ScrollIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-rajdhani text-sm text-white/50 tracking-widest uppercase">
          Scroll to explore
        </span>
        <svg
          className="w-6 h-6 text-lambo-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function HexagonBorder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <path
        d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
        strokeWidth="2"
      />
    </svg>
  );
}
