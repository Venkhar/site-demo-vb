'use client';

import { motion } from 'framer-motion';
import { temerarioData } from '@/data/carData';

const customEase: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export default function SpecsGrid() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-lambo-black">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: customEase }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white tracking-wider">
          PERFORMANCE
        </h2>
        <p className="font-rajdhani text-lg md:text-xl text-lambo-teal mt-2 tracking-wider">
          NUMBERS THAT DEFINE EXCELLENCE
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {temerarioData.statsGrid.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: customEase,
            }}
            whileHover={{ scale: 1.05, borderColor: 'var(--color-lambo-purple)' }}
            className="bg-carbon-gray border border-carbon-light p-6 md:p-8 transition-all duration-300 group cursor-pointer"
          >
            <motion.div
              className="text-3xl md:text-5xl font-orbitron font-black text-lambo-purple mb-2 group-hover:glow-purple transition-shadow"
            >
              {stat.value}
            </motion.div>
            <div className="text-xs md:text-sm font-rajdhani uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8, ease: customEase }}
        className="mt-12 md:mt-16 h-px bg-gradient-to-r from-transparent via-lambo-purple/50 to-transparent max-w-4xl mx-auto"
      />
    </section>
  );
}
