'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

// Current date: June 22, 2026
// past   = already happened
// live   = happening now / this week (within ~3 days)
// current = active window open right now
// upcoming = not yet
const TIMELINE_EVENTS = [
  {
    date: 'June 19',
    title: 'Campaign Launch',
    desc: 'Official announcement and campaign kickoff for Data Odyssey 2026.',
    status: 'past',
    highlight: false,
  },
  {
    date: 'June 25',
    title: 'Registration & Proposal Opens',
    desc: 'Team registration portal and proposal submission system goes live. Get ready to submit your team details and project proposal.',
    status: 'live',
    highlight: true,
  },
  {
    date: 'July 10',
    title: 'Phase 1 Registration Closes',
    desc: 'Early registration deadline. Teams registered in Phase 1 receive priority consideration.',
    status: 'upcoming',
    highlight: false,
  },
  {
    date: 'July 11',
    title: 'Phase 2 Registration Opens',
    desc: 'Second registration window opens for additional teams.',
    status: 'upcoming',
    highlight: false,
  },
  {
    date: 'July 15',
    title: 'Registration Locked',
    desc: 'All team registrations finalized. No further submissions accepted after this date.',
    status: 'upcoming',
    highlight: false,
  },
  {
    date: 'July 20',
    title: 'Shortlist Announcement',
    desc: 'Selected teams are officially notified and confirmed for competition.',
    status: 'upcoming',
    highlight: true,
  },
  {
    date: 'August 5',
    title: 'Demo Video Deadline',
    desc: 'Final deadline for shortlisted teams to submit demo videos.',
    status: 'upcoming',
    highlight: false,
  },
  {
    date: 'August 18',
    title: 'Data Day 2026',
    desc: 'Industry seminar with guest speakers, panels, and networking sessions.',
    status: 'upcoming',
    highlight: true,
  },
  {
    date: 'August 21',
    title: 'Data Odyssey Grand Finale',
    desc: 'Top teams present, compete, and vie for the championship title.',
    status: 'upcoming',
    highlight: true,
  },
];

const STATUS = {
  past: {
    dot: 'bg-white/20 border-white/20',
    text: 'text-white/40',
    card: 'border-white/[0.05] hover:border-white/10 opacity-70',
    titleColor: 'text-white/50',
    line: 'bg-white/10',
  },
  live: {
    dot: 'bg-cyan-400 border-cyan-300 shadow-[0_0_14px_rgba(0,245,255,1)]',
    text: 'text-cyan-400',
    card: 'border-cyan-500/40 hover:border-cyan-500/60 shadow-[0_0_24px_rgba(0,245,255,0.12)]',
    titleColor: 'text-cyan-300',
    line: 'bg-cyan-400/30',
  },
  current: {
    dot: 'bg-cyan-400 border-cyan-500 shadow-[0_0_10px_rgba(0,245,255,0.8)]',
    text: 'text-cyan-400',
    card: 'border-cyan-500/30 hover:border-cyan-500/50 shadow-glow-cyan',
    titleColor: 'text-cyan-300',
    line: 'bg-cyan-400/20',
  },
  upcoming: {
    dot: 'bg-transparent border-white/20',
    text: 'text-white/30',
    card: 'border-white/[0.06] hover:border-white/10',
    titleColor: 'text-white/80',
    line: 'bg-white/5',
  },
};

export default function TimelineSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="timeline" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
            <CalendarDays className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              Competition Timeline
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.75rem, 6vw, 3.75rem)' }}
          >
            KEY{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MILESTONES
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
            Every great journey has a roadmap. Here's yours.
          </p>

          {/* Current date indicator */}
          <div className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full bg-cyan-500/8 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400/70 tracking-widest">TODAY — JUNE 22, 2026</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/10 to-transparent pointer-events-none" />

          <div className="space-y-3 sm:space-y-4">
            {TIMELINE_EVENTS.map((event, i) => {
              const cfg = STATUS[event.status as keyof typeof STATUS];
              const isLive = event.status === 'live';
              const isPast = event.status === 'past';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex gap-4 sm:gap-6 items-start"
                >
                  {/* Dot column */}
                  <div className="relative flex-shrink-0 w-8 sm:w-10 flex justify-center mt-3 sm:mt-3.5">
                    <div
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 ${cfg.dot} z-10 relative ${isLive ? 'animate-pulse' : ''}`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-card border ${cfg.card} transition-all duration-300 mb-1 ${isLive ? 'relative overflow-hidden' : ''}`}
                  >
                    {/* Live shimmer strip */}
                    {isLive && (
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    )}

                    {/* Date + badge row */}
                    <div className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono mb-1 sm:mb-1.5 ${cfg.text} tracking-wider`}>
                      <span>{event.date}</span>

                      {isLive && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                          OPENS IN 3 DAYS
                        </span>
                      )}
                      {isPast && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-white/30 border border-white/10">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    <h4
                      className={`font-semibold text-sm sm:text-base mb-1 sm:mb-1.5 leading-tight ${event.highlight ? cfg.titleColor : isPast ? 'text-white/45' : 'text-white/70'}`}
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {event.title}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isPast ? 'text-white/30' : 'text-white/45'}`}>
                      {event.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
