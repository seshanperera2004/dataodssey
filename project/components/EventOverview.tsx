'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic2, Trophy, Brain, Cpu, Shield, TrendingUp } from 'lucide-react';

const OVERVIEW_CARDS = [
  {
    id: 'data-day',
    badge: 'SIDE EVENT',
    title: 'Data Day 2026',
    subtitle: 'August 18, 2026',
    description:
      'An industry-grade seminar featuring visionary guest speakers from leading technology companies. Gain inspiration, insights, and cutting-edge perspectives on the future of AI and data science.',
    icon: Mic2,
    features: ['Guest Speakers', 'Industry Panels', 'Networking Sessions', 'Career Insights'],
    gradient: 'from-cyan-500/10 to-blue-500/5',
    borderColor: 'border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverShadow: 'hover:shadow-glow-cyan',
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    dotColor: 'bg-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    titleColor: 'text-cyan-300',
  },
  {
    id: 'data-odyssey',
    badge: 'MAIN EVENT',
    title: 'Data Odyssey 2026',
    subtitle: 'August 21, 2026',
    description:
      'The premier national data science competition where university teams tackle real-world challenges using machine learning, predictive modeling, and intelligent automation systems.',
    icon: Trophy,
    features: ['Real-World Challenges', 'Live Judging', 'Exhibition Showcase', 'Prize Ceremony'],
    gradient: 'from-purple-500/10 to-blue-500/5',
    borderColor: 'border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/40',
    hoverShadow: 'hover:shadow-glow-purple',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    dotColor: 'bg-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    titleColor: 'text-purple-300',
  },
];

const OBJECTIVES = [
  {
    icon: TrendingUp,
    title: 'Predictive Modeling',
    desc: 'Design cutting-edge models that forecast real-world outcomes with precision.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Cpu,
    title: 'Intelligent Automation',
    desc: 'Build autonomous systems that streamline complex processes at scale.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Shield,
    title: 'Ethical AI',
    desc: 'Develop responsible AI solutions that prioritize fairness and human values.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];

export default function EventOverview() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 sm:h-32 bg-gradient-to-b from-transparent to-cyan-500/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
            <Brain className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              Event Overview
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
            }}
          >
            TWO DAYS.{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              INFINITE
            </span>{' '}
            IMPACT.
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            A two-event experience combining industry knowledge with competitive innovation —
            designed to shape the next generation of AI leaders.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {OVERVIEW_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className={`group relative p-5 sm:p-6 lg:p-8 rounded-2xl glass-card border ${card.borderColor} ${card.hoverBorder} ${card.hoverShadow} transition-all duration-500 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl ${card.gradient} opacity-40 rounded-bl-[80px] sm:rounded-bl-[100px] pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5 sm:mb-6">
                  <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl ${card.iconBg} border ${card.iconBorder} flex items-center justify-center`}>
                    <card.icon className={`w-6 sm:w-7 h-6 sm:h-7 ${card.iconColor}`} />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border ${card.badgeBg}`}>
                    {card.badge}
                  </span>
                </div>

                <h3
                  className={`font-bold text-white mb-1 ${card.titleColor}`}
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  }}
                >
                  {card.title}
                </h3>
                <p className={`text-xs sm:text-sm font-mono mb-3 sm:mb-4 ${card.iconColor}`}>{card.subtitle}</p>
                <p className="text-white/60 leading-relaxed text-sm mb-5 sm:mb-6">{card.description}</p>

                <div className="grid grid-cols-2 gap-2">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-1.5 sm:gap-2 text-xs text-white/50">
                      <div className={`w-1.5 h-1.5 rounded-full ${card.dotColor} shrink-0`} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h3 className="text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
            Core Objectives
          </h3>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {OBJECTIVES.map((obj, i) => (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group p-5 sm:p-6 rounded-2xl glass-card border ${obj.border} transition-all duration-300 text-center`}
            >
              <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl ${obj.bg} border ${obj.border} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <obj.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${obj.color}`} />
              </div>
              <h4
                className="font-semibold text-white mb-2 text-sm sm:text-base"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {obj.title}
              </h4>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{obj.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
