'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, Medal, Award, CheckCircle2 } from 'lucide-react';

const PRIZES = [
  {
    rank: 2,
    place: '2ND',
    amount: 'LKR 15,000',
    icon: Medal,
    borderColor: 'border-purple-500/30',
    glowShadow: '0 0 40px rgba(139,92,246,0.25)',
    bgGradient: 'from-purple-500/10 via-transparent to-transparent',
    textColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    lineColor: 'from-purple-500/40',
    featured: false,
    benefits: ['Certificate of Distinction', 'Recognition Award', 'Networking Opportunities'],
  },
  {
    rank: 1,
    place: '1ST',
    amount: 'LKR 25,000',
    icon: Trophy,
    borderColor: 'border-cyan-500/40',
    glowShadow: '0 0 60px rgba(0,245,255,0.3)',
    bgGradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    textColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    lineColor: 'from-cyan-500/60',
    featured: true,
    benefits: ['Champion Trophy', 'Certificate of Excellence', 'Industry Recognition', 'Feature on Event Media'],
  },
  {
    rank: 3,
    place: '3RD',
    amount: 'LKR 10,000',
    icon: Award,
    borderColor: 'border-blue-500/30',
    glowShadow: '0 0 40px rgba(0,102,255,0.25)',
    bgGradient: 'from-blue-500/10 via-transparent to-transparent',
    textColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    lineColor: 'from-blue-500/40',
    featured: false,
    benefits: ['Certificate of Achievement', 'Industry Exposure', 'Participation Recognition'],
  },
];

export default function PrizesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="prizes" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-cyan-500/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
            <Trophy className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              Prize Pool
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
            }}
          >
            COMPETE FOR{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              GLORY
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-2">
            Cash prizes, prestigious trophies, and career-defining industry recognition.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl glass border border-cyan-500/20"
          >
            <span className="text-white/50 text-xs sm:text-sm">Total Prize Pool</span>
            <span
              className="font-black text-cyan-400"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}
            >
              LKR 50,000
            </span>
          </motion.div>
        </motion.div>

        {/* Prize cards — mobile stack, desktop podium */}
        {/* Mobile: 1st on top, then 2nd, 3rd */}
        <div className="flex flex-col gap-5 sm:gap-6 lg:hidden">
          {[PRIZES[1], PRIZES[0], PRIZES[2]].map((prize, i) => (
            <MobilePrizeCard key={prize.rank} prize={prize} index={i} />
          ))}
        </div>

        {/* Desktop: podium layout 2nd | 1st (elevated) | 3rd */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 lg:items-end">
          {PRIZES.map((prize, i) => (
            <DesktopPrizeCard key={prize.rank} prize={prize} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:mt-12 text-white/25 text-xs font-mono px-4"
        >
          * All participants receive certificates. Top 12 teams advance to the Industry Impact Program.
        </motion.p>
      </div>
    </section>
  );
}

function MobilePrizeCard({ prize, index }: { prize: typeof PRIZES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative p-5 sm:p-6 rounded-2xl glass-card border ${prize.borderColor} overflow-hidden`}
      style={{ boxShadow: prize.glowShadow }}
    >
      {prize.featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      )}
      <div className={`absolute inset-0 bg-gradient-to-br ${prize.bgGradient} opacity-60`} />

      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div className={`shrink-0 w-14 h-14 rounded-2xl ${prize.iconBg} border ${prize.borderColor} flex items-center justify-center`}>
          <prize.icon className={`w-7 h-7 ${prize.textColor}`} />
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${prize.badgeBg}`}>
              {prize.place} PLACE
            </span>
            {prize.featured && (
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                CHAMPION
              </span>
            )}
          </div>
          <div
            className={`font-black ${prize.textColor}`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.2rem, 4vw, 1.75rem)' }}
          >
            {prize.amount}
          </div>
        </div>
      </div>

      <div className={`relative z-10 h-px bg-gradient-to-r ${prize.lineColor} to-transparent my-4`} />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prize.benefits.map((b) => (
          <div key={b} className="flex items-center gap-2 text-xs text-white/60">
            <CheckCircle2 className={`w-3.5 h-3.5 ${prize.textColor} shrink-0`} />
            {b}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DesktopPrizeCard({ prize, index }: { prize: typeof PRIZES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`group relative ${prize.featured ? 'lg:-mt-8' : ''}`}
    >
      <div
        className={`relative h-full p-6 xl:p-8 rounded-3xl glass-card border ${prize.borderColor} overflow-hidden transition-all duration-500`}
        style={{ boxShadow: prize.glowShadow }}
      >
        {prize.featured && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${prize.bgGradient} opacity-60`} />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5 xl:mb-6">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${prize.badgeBg}`}>
              <Star className={`w-3 h-3 ${prize.textColor}`} fill="currentColor" />
              <span className={`text-xs font-mono font-semibold ${prize.textColor} tracking-wider`}>
                {prize.place} PLACE
              </span>
            </div>
            {prize.featured && (
              <span className="text-xs font-mono text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 px-3 py-1.5 rounded-full">
                CHAMPION
              </span>
            )}
          </div>

          <div className={`w-16 xl:w-20 h-16 xl:h-20 rounded-2xl ${prize.iconBg} border ${prize.borderColor} flex items-center justify-center mb-5 xl:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500`}>
            <prize.icon className={`w-8 xl:w-10 h-8 xl:h-10 ${prize.textColor} ${prize.featured ? 'animate-float' : ''}`} />
          </div>

          <div className="text-center mb-5 xl:mb-6">
            <div
              className={`font-black ${prize.textColor} mb-1`}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              {prize.amount}
            </div>
            <div className="text-white/30 text-xs font-mono tracking-widest uppercase">Prize Money</div>
          </div>

          <div className={`h-px bg-gradient-to-r ${prize.lineColor} to-transparent mb-5 xl:mb-6`} />

          <div className="space-y-2.5 xl:space-y-3">
            {prize.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2.5 xl:gap-3">
                <CheckCircle2 className={`w-4 h-4 ${prize.textColor} shrink-0`} />
                <span className="text-sm text-white/70">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
