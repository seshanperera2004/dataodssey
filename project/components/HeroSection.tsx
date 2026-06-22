'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Calendar, Users } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050816]" />,
});

const BADGES = [
  { icon: Calendar, text: 'July – August 2026' },
  { icon: Users, text: 'Multi-Phase Competition' },
  { icon: MapPin, text: 'Sri Lanka' },
];

const MS_FORM_URL = 'https://forms.office.com/r/YOUR_FORM_ID'; // Replace with actual MS Form URL

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050816]"
    >
      {/* Canvas background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Overlay gradients */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/50 via-transparent to-[#050816]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/30 via-transparent to-[#050816]/30" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20 sm:pt-32 sm:pb-24"
      >
        {/* Organizer badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-6 sm:mb-8"
        >
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-wider">
            AI & DATA SCIENCE CLUB · KDU
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <h1
            className="font-black leading-[0.88] tracking-tight mb-4 sm:mb-5 select-none"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(3rem, 14vw, 8rem)',
            }}
          >
            <span className="block text-white">DATA</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ODYSSEY
            </span>
            <span
              className="block text-white/25 mt-1"
              style={{ fontSize: 'clamp(2rem, 9vw, 6rem)' }}
            >
              2026
            </span>
          </h1>
        </motion.div>

        {/* Sub heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base lg:text-lg text-white/50 font-medium tracking-[0.1em] sm:tracking-widest uppercase mt-4 mb-4 sm:mb-6 px-2"
        >
          Inter-University Data Science Competition & Exhibition
        </motion.p>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <p
            className="font-light text-white/80 leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 5vw, 2.5rem)' }}
          >
            Humanity{' '}
            <span className="text-cyan-400 font-semibold">×</span>{' '}
            AI
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-white/40 mt-1.5">
            The New Age of Innovation
          </p>
        </motion.div>

        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          {BADGES.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card border border-white/[0.08] text-xs sm:text-sm text-white/70"
            >
              <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400 shrink-0" />
              <span className="whitespace-nowrap">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-stretch xs:items-center px-4 sm:px-0"
        >
          <a
            href={MS_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 rounded-xl overflow-hidden shadow-glow-cyan hover:shadow-glow-lg-cyan transition-all duration-300"
          >
            <span className="relative z-10">Register Your Team</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          </a>

          <button
            onClick={() =>
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white/80 hover:text-white glass-card border border-white/[0.1] hover:border-cyan-500/30 rounded-xl transition-all duration-300"
          >
            Learn More
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.3, duration: 1.0 }}
          className="mt-14 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-xs sm:max-w-sm lg:max-w-lg mx-auto"
        >
          {[
            { value: '10+', label: 'Universities' },
            { value: '50+', label: 'Teams' },
            { value: 'LKR 50K', label: 'Prize Pool' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-bold text-cyan-400 mb-0.5 sm:mb-1"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                }}
              >
                {value}
              </div>
              <div className="text-[9px] sm:text-xs text-white/40 uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 sm:gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-[9px] sm:text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
