'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Briefcase, Users, TrendingUp, Star, ArrowRight, Layers, Code2 } from 'lucide-react';

const BENEFITS = [
  { icon: Briefcase, title: 'Industry Challenges', desc: 'Top teams tackle real challenges sourced from leading tech companies.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: Code2, title: 'GitHub Collaboration', desc: 'Work on live repositories with code reviews and professional workflows.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { icon: Users, title: 'Corporate Mentorship', desc: 'Sessions with industry engineers, data scientists, and AI researchers.', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { icon: TrendingUp, title: 'Professional Exposure', desc: 'Work featured in industry reports and official event media.', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { icon: Layers, title: 'Real-World Projects', desc: 'Build production-grade solutions solving genuine business problems.', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { icon: Star, title: 'Portfolio Building', desc: 'Verified project experience that significantly enhances career profiles.', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

const WORKFLOW = [
  { step: '01', label: 'Shortlisted', desc: 'Top 12 finalist teams selected' },
  { step: '02', label: 'Brief Issued', desc: 'Industry challenge provided' },
  { step: '03', label: 'Development', desc: 'Build on GitHub repos' },
  { step: '04', label: 'Mentorship', desc: 'Corporate mentor review' },
  { step: '05', label: 'Delivery', desc: 'Solution presented' },
];

export default function IndustryImpact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="industry" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

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
            <Github className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              Industry Impact Program
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
            }}
          >
            BEYOND THE{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              COMPETITION
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            The top 12 finalist teams enter an exclusive industry acceleration program designed to launch real careers.
          </p>
        </motion.div>

        {/* Top 12 banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-card border border-cyan-500/20 shadow-glow-cyan mb-10 sm:mb-12 overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
          <div className="relative z-10">
            <div
              className="font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-2"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(3rem, 12vw, 5rem)' }}
            >
              TOP 12
            </div>
            <p className="text-white/60 text-sm sm:text-base">
              Finalist teams advance to the exclusive Industry Impact Program
            </p>
          </div>
        </motion.div>

        {/* Workflow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <h3 className="text-center text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase mb-6 sm:mb-8">
            Industry Workflow
          </h3>

          {/* Mobile: vertical steps */}
          <div className="flex flex-col gap-3 sm:hidden">
            {WORKFLOW.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-3.5 rounded-xl glass-card border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-xl glass-card border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono text-cyan-400 font-bold">{step.step}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{step.label}</div>
                  <div className="text-xs text-white/40">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: horizontal steps */}
          <div className="hidden sm:flex items-center justify-between gap-2 lg:gap-4">
            {WORKFLOW.map((step, i) => (
              <div key={step.step} className="flex flex-col items-center text-center flex-1 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                  className="w-12 h-12 rounded-2xl glass-card border border-cyan-500/20 flex items-center justify-center mb-3"
                >
                  <span className="text-xs font-mono text-cyan-400 font-bold">{step.step}</span>
                </motion.div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>{step.label}</div>
                <div className="text-[10px] sm:text-xs text-white/40">{step.desc}</div>
                {i < WORKFLOW.length - 1 && (
                  <div className="absolute right-0 top-5 translate-x-1/2 z-10">
                    <ArrowRight className="w-3 h-3 text-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-card border ${benefit.border} transition-all duration-300`}
            >
              <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl ${benefit.bg} border ${benefit.border} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${benefit.color}`} />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {benefit.title}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
