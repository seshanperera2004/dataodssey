'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const BOOT_TASKS = [
  { label: 'Initialising Data Odyssey Core', detail: 'Loading core system modules...' },
  { label: 'Connecting University Network', detail: 'Establishing secure inter-university links...' },
  { label: 'Loading Competition Environment', detail: 'Configuring AI & ML challenge pipelines...' },
  { label: 'Synchronising Event Data', detail: 'Fetching schedules, prizes & team data...' },
  { label: 'System Ready', detail: 'All modules operational. Welcome!' },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const totalDuration = 3000;
    const step = totalDuration / BOOT_TASKS.length;

    BOOT_TASKS.forEach((_, i) => {
      setTimeout(() => {
        setCurrentTask(i);
        setProgress(Math.round(((i + 1) / BOOT_TASKS.length) * 100));
      }, i * step);
    });

    setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        setFading(true);
        setTimeout(onComplete, 600);
      }, 500);
    }, totalDuration + 200);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#020510] flex items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

          {/* Scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
              animate={{ y: ['0vh', '100vh'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Glow orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

          <div className="w-full max-w-lg mx-4 flex flex-col items-center gap-8">

            {/* Logo lockup */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative w-20 sm:w-24 h-20 sm:h-24">
                <Image
                  src="/images/logos/AIclub3d.png"
                  alt="DatAInspire"
                  fill
                  className="object-contain drop-shadow-[0_0_24px_rgba(0,245,255,0.35)]"
                  sizes="96px"
                  priority
                />
              </div>
              <div className="text-center">
                <div
                  className="font-black text-white tracking-widest leading-none"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.4rem, 5vw, 2rem)' }}
                >
                  DATA ODYSSEY
                </div>
                <div
                  className="font-black text-cyan-400 tracking-widest leading-none"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.4rem, 5vw, 2rem)' }}
                >
                  2026
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-white/30 tracking-[0.25em] mt-1 uppercase">
                  AI & Data Science Club · KDU
                </div>
              </div>
            </motion.div>

            {/* Task panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              className="w-full glass-card rounded-2xl overflow-hidden border border-cyan-500/20 shadow-glow-cyan"
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] sm:text-xs text-white/35 font-mono tracking-wider">
                  dataodyssey.init — boot sequence
                </span>
              </div>

              {/* Task list */}
              <div className="p-5 sm:p-6 space-y-3">
                {BOOT_TASKS.map((task, i) => {
                  const isActive = i === currentTask && !done;
                  const isComplete = i < currentTask || done;
                  const isPending = i > currentTask && !done;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      {/* Status indicator */}
                      <div className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                        {isComplete ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3.5 h-3.5 rounded-full bg-cyan-400 flex items-center justify-center"
                          >
                            <svg viewBox="0 0 10 10" className="w-2 h-2 text-[#020510]" fill="currentColor">
                              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        ) : isActive ? (
                          <motion.div
                            className="w-3 h-3 rounded-full border-2 border-cyan-400 border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                          />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-white/15" />
                        )}
                      </div>

                      {/* Label + detail */}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs sm:text-sm font-mono font-medium leading-snug transition-colors duration-300 ${
                            isComplete
                              ? i === BOOT_TASKS.length - 1
                                ? 'text-green-400'
                                : 'text-white/70'
                              : isActive
                              ? 'text-cyan-300'
                              : 'text-white/25'
                          }`}
                        >
                          {isComplete || isActive ? '> ' : '  '}{task.label}
                          {isActive && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 align-middle"
                            />
                          )}
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] text-white/30 font-mono mt-0.5 truncate"
                          >
                            {task.detail}
                          </motion.div>
                        )}
                      </div>

                      {/* Step badge */}
                      <div className={`shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isComplete ? 'text-cyan-400/60' : 'text-white/15'
                      }`}>
                        {String(i + 1).padStart(2, '0')}/{BOOT_TASKS.length}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-white/35 tracking-wider uppercase">
                    {done ? 'All Systems Operational' : 'Boot Progress'}
                  </span>
                  <motion.span
                    key={progress}
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-xs font-mono font-bold ${done ? 'text-green-400' : 'text-cyan-400'}`}
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {progress}%
                  </motion.span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${done ? 'bg-gradient-to-r from-cyan-400 to-green-400' : 'progress-bar'}`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
