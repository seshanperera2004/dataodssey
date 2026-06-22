'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Flag, Gavel, Award, X } from 'lucide-react';

const SCHEDULE = [
  { time: '8:30 AM', duration: '30 min', title: 'Inauguration Ceremony', desc: 'Official opening, welcome remarks, and introduction of keynote speakers.', icon: Flag, color: 'cyan', border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', text: 'text-cyan-400', dotColor: '#00f5ff' },
  { time: '9:00 AM', duration: 'Start', title: 'Competition Begins', desc: 'Teams commence their presentations and live demonstrations before judges.', icon: Clock, color: 'blue', border: 'border-blue-500/20', bg: 'bg-blue-500/10', text: 'text-blue-400', dotColor: '#0066ff' },
  { time: '9:00 AM – 12:00 PM', duration: '3 hrs', title: 'Judging Session', desc: 'Panel of industry experts and academics evaluate all team submissions.', icon: Gavel, color: 'purple', border: 'border-purple-500/20', bg: 'bg-purple-500/10', text: 'text-purple-400', dotColor: '#8b5cf6' },
  { time: '12:00 PM – 1:00 PM', duration: '1 hr', title: 'Score Compilation', desc: 'Judging panel finalizes evaluations and computes final rankings.', icon: Clock, color: 'yellow', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10', text: 'text-yellow-400', dotColor: '#facc15' },
  { time: '1:00 PM – 2:00 PM', duration: '1 hr', title: 'Award Ceremony', desc: 'Prize presentations, trophies, certificates, and championship recognition.', icon: Award, color: 'cyan', border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', text: 'text-cyan-400', dotColor: '#00f5ff' },
  { time: '2:00 PM – 2:30 PM', duration: '30 min', title: 'Official Closing', desc: 'Closing remarks, acknowledgments, group photographs, and networking.', icon: X, color: 'white', border: 'border-white/10', bg: 'bg-white/5', text: 'text-white/60', dotColor: '#ffffff40' },
];

export default function ScheduleSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="schedule" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
            <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              August 21, 2026
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
            }}
          >
            GRAND{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              FINALE
            </span>{' '}
            SCHEDULE
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
            A meticulously designed day built for champions.
          </p>
        </motion.div>

        {/* Schedule list */}
        <div className="relative">
          {/* Left accent line */}
          <div className="absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/30 via-blue-500/15 to-transparent hidden sm:block" />

          <div className="space-y-3 sm:space-y-4">
            {SCHEDULE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                className={`relative flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-card border ${item.border} transition-all duration-300 group`}
              >
                {/* Timeline dot (hidden on very small, shown sm+) */}
                <div
                  className="absolute left-[16px] sm:left-[20px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 hidden sm:block z-10"
                  style={{ borderColor: item.dotColor, backgroundColor: item.dotColor + '30' }}
                />

                {/* Icon */}
                <div className={`shrink-0 sm:ml-5 w-9 sm:w-11 h-9 sm:h-11 rounded-lg sm:rounded-xl ${item.bg} border ${item.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${item.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <h4
                      className="font-semibold text-white text-sm sm:text-base leading-tight"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {item.title}
                    </h4>
                    <span className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg ${item.bg} ${item.text} shrink-0`}>
                      {item.duration}
                    </span>
                  </div>
                  <div className={`text-[10px] sm:text-xs font-mono mb-1 sm:mb-1.5 ${item.text} opacity-70`}>
                    {item.time}
                  </div>
                  <p className="text-xs sm:text-sm text-white/45 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
