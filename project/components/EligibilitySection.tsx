'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Globe, Download, CheckCircle2, UserCheck, AlertCircle, Brain } from 'lucide-react';
import dynamic from 'next/dynamic';

const AIDemoModal = dynamic(() => import('./AIDemoModal'), { ssr: false });

const RULES = [
  {
    icon: Users,
    title: 'Team Composition',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    items: [
      'Teams of 1 to 4 members',
      'One designated team leader required',
      'All members from the same university',
      'Leader responsible for all submissions',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Academic Eligibility',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    items: [
      'Open to all Sri Lankan university students',
      'Undergraduate & postgraduate welcome',
      'Any academic discipline accepted',
      'Valid student enrollment required',
    ],
  },
  {
    icon: Globe,
    title: 'Project Requirements',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    items: [
      'Project must relate to AI or Data Science',
      'Original work developed by the team',
      'Must solve a real-world problem',
      'Proposal in PDF format required',
    ],
  },
];

export default function EligibilitySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section id="eligibility" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

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
              <UserCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
              <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
                Eligibility Criteria
              </span>
            </div>
            <h2
              className="font-bold text-white mb-3 sm:mb-4"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
              }}
            >
              WHO CAN{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                COMPETE
              </span>
              ?
            </h2>
            <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-2">
              Open to all Sri Lankan university students with a passion for data science and AI.
            </p>
          </motion.div>

          {/* Rules cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 mb-8 sm:mb-12">
            {RULES.map((rule, i) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group p-5 sm:p-6 lg:p-8 rounded-2xl glass-card border ${rule.border} transition-all duration-300`}
              >
                <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl ${rule.bg} border ${rule.border} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <rule.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${rule.text}`} />
                </div>
                <h3
                  className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {rule.title}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {rule.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${rule.text} shrink-0 mt-0.5`} />
                      <span className="text-xs sm:text-sm text-white/60 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note + Download + Demo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Important note */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl glass border border-yellow-500/20 bg-yellow-500/5"
            >
              <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4
                  className="text-xs sm:text-sm font-semibold text-yellow-400 mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Important Note
                </h4>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  Projects must be original work by the registered team. Plagiarism or use of pre-built commercial solutions leads to immediate disqualification.
                </p>
              </div>
            </motion.div>

            {/* Download guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl glass-card border border-cyan-500/20 text-center"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Download className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
              </div>
              <div>
                <h4
                  className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Competition Guidelines
                </h4>
                <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">
                  Full rules, judging criteria, and submission guidelines.
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-glow-cyan">
                <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                Download Guidelines PDF
              </button>
            </motion.div>

            {/* AI Demo button card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="relative flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl glass-card border border-blue-500/20 text-center overflow-hidden group"
            >
              {/* Animated glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              <motion.div
                animate={{ boxShadow: ['0 0 10px rgba(59,130,246,0.2)', '0 0 24px rgba(59,130,246,0.5)', '0 0 10px rgba(59,130,246,0.2)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
              >
                <Brain className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" />
              </motion.div>

              <div>
                <h4
                  className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  AI Demo
                </h4>
                <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">
                  Try our live AI emotion & personality insights experience — powered by your webcam.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDemoOpen(true)}
                className="relative flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-[0_0_14px_rgba(59,130,246,0.35)] hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
              >
                <Brain className="w-3.5 h-3.5" />
                Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <AIDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
