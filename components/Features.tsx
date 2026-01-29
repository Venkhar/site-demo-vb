'use client';

import { motion } from 'framer-motion';
import { Zap, Gauge, Wind, Cpu, LucideIcon } from 'lucide-react';
import { temerarioData } from '@/data/carData';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Gauge,
  Wind,
  Cpu,
};

const customEase: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-carbon-gray tech-grid">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: customEase }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white tracking-wider">
          INNOVATION
        </h2>
        <p className="font-rajdhani text-lg md:text-xl text-lambo-teal mt-2 tracking-wider">
          TECHNOLOGY MEETS PASSION
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
        {temerarioData.features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: customEase,
              }}
              className="group"
            >
              <div className="flex items-start gap-4 md:gap-6 p-6 bg-lambo-black/50 border border-carbon-light hover:border-lambo-purple/50 transition-all duration-300">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-lambo-purple/10 border border-lambo-purple/30 group-hover:bg-lambo-purple/20 group-hover:border-lambo-purple/50 transition-all duration-300">
                    {Icon && (
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-lambo-teal group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-orbitron text-lg md:text-xl font-bold text-white tracking-wider mb-2 group-hover:text-lambo-teal transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-rajdhani text-sm md:text-base text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-lambo-purple/20 group-hover:border-lambo-purple/50 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6, ease: customEase }}
        className="text-center mt-12 md:mt-16"
      >
        <p className="font-rajdhani text-lg md:text-xl text-white/60 mb-6 tracking-wider">
          Experience the future of super sports cars
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 border-2 border-lambo-teal text-lambo-teal hover:bg-lambo-teal hover:text-black font-rajdhani font-bold text-lg tracking-wider transition-all duration-300"
        >
          DISCOVER MORE
        </motion.button>
      </motion.div>
    </section>
  );
}
