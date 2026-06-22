'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers } from 'lucide-react';

const PARTNER_CATEGORIES = [
  {
    category: 'Official Media Partner',
    slots: ['Media Partner', 'Media Sponsor'],
  },
  {
    category: 'Technology Partner',
    slots: ['Tech Partner', 'Cloud Sponsor'],
  },
  {
    category: 'Food & Beverage Partner',
    slots: ['F&B Partner'],
  },
  {
    category: 'Branding Partner',
    slots: ['Design Partner'],
  },
];

export default function PartnersSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="partners" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
            <Layers className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              Our Partners
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
            }}
          >
            POWERED BY{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              INDUSTRY
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-2">
            Partnering with leading organizations to deliver a world-class competition experience.
          </p>
        </motion.div>

        {/* Partner groups */}
        <div className="space-y-10 sm:space-y-12">
          {PARTNER_CATEGORIES.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
                <span className="text-[9px] sm:text-xs font-mono text-white/30 tracking-widest uppercase px-3 sm:px-4 py-1.5 glass rounded-full border border-white/[0.06] whitespace-nowrap">
                  {group.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {group.slots.map((slot, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (gi * 4 + si) * 0.04 }}
                    whileHover={{ scale: 1.03 }}
                    className="group flex items-center justify-center h-20 sm:h-24 rounded-xl sm:rounded-2xl glass-card border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-center">
                      <Layers className="w-5 h-5 text-white/15 group-hover:text-cyan-400/40 transition-colors mx-auto mb-1.5" />
                      <span className="text-[10px] sm:text-xs text-white/25 font-mono group-hover:text-white/40 transition-colors block">
                        {slot}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Become a partner */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center h-20 sm:h-24 rounded-xl sm:rounded-2xl border-2 border-dashed border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-[10px] sm:text-xs font-mono text-white/20 group-hover:text-cyan-400/50 transition-colors text-center px-2">
                    + Become a Partner
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
