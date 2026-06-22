'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail, Phone, Linkedin, Facebook, Instagram,
  Clock, MapPin, ExternalLink, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { withBasePath } from '@/lib/asset-path';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Eligibility', href: '#eligibility' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Past Events', href: '#past-events' },
  { label: 'Industry', href: '#industry' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Partners', href: '#partners' },
];

const SOCIAL = [
  { icon: Linkedin, label: 'LinkedIn', href: '#', hoverClass: 'hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20' },
  { icon: Facebook, label: 'Facebook', href: '#', hoverClass: 'hover:text-blue-500 hover:bg-blue-600/10 hover:border-blue-600/20' },
  { icon: Instagram, label: 'Instagram', href: '#', hoverClass: 'hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/20' },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const scrollTo = (href: string) =>
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="contact" className="relative bg-[#020510] overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* ── Contact section ── */}
      <div className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/4 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
              <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
              <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
                Get In Touch
              </span>
            </div>
            <h2
              className="font-bold text-white mb-3 sm:mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.75rem, 6vw, 3.75rem)' }}
            >
              CONTACT{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                US
              </span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-2">
              Have questions? Reach out to the Data Odyssey team directly.
            </p>
          </motion.div>

          {/* Contact cards — 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-12">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="group p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>Email</h4>
              <p className="text-xs text-white/40 mb-2 sm:mb-3">Primary contact</p>
              <a href="mailto:dataodyssey2026@kdu.ac.lk" className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/lnk">
                <span className="truncate">dataodyssey2026@kdu.ac.lk</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/lnk:opacity-100 transition-opacity shrink-0" />
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.07 }}
              className="group p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>Phone</h4>
              <p className="text-xs text-white/40 mb-2 sm:mb-3">Available during office hours</p>
              <a href="tel:+94112345678" className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group/lnk">
                <span>+94 11 234 5678</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/lnk:opacity-100 transition-opacity shrink-0" />
              </a>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="group p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.06] hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-purple-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>Address</h4>
              <p className="text-xs text-white/40 mb-2 sm:mb-3">Venue location</p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Kandawala Estate, Ratmalana<br />
                Western Province, Sri Lanka
              </p>
              <a
                href="https://maps.google.com/?q=General+Sir+John+Kotelawala+Defence+University"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Open in Maps
              </a>
            </motion.div>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-3 sm:gap-4"
          >
            {SOCIAL.map(({ icon: Icon, label, href, hoverClass }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-xl glass-card border border-white/[0.06] text-white/40 transition-all duration-300 ${hoverClass}`}
              >
                <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Footer bottom bar ── */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-10">

            {/* Brand column — AIclub3d + KDU logos */}
            <div className="sm:col-span-2 lg:col-span-2">
              {/* Primary logo lockup */}
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                {/* AIclub3d — generously sized */}
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 shrink-0">
                  <Image
                    src={withBasePath('/images/logos/AIclub3d.png')}
                    alt="DatAInspire Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_10px_rgba(0,245,255,0.2)]"
                    sizes="80px"
                  />
                </div>
                <div>
                  <div
                    className="font-black text-white leading-none"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                  >
                    DATA ODYSSEY
                  </div>
                  <div
                    className="font-black text-cyan-400 leading-none"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                  >
                    2026
                  </div>
                  <div className="text-[10px] text-white/35 tracking-[0.18em] font-mono mt-1 uppercase">
                    DatAInspire · KDU
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/40 leading-relaxed max-w-xs mb-5">
                The premier inter-university data science competition and exhibition, shaping the future of AI in Sri Lanka.
              </p>

              {/* KDU logo + label */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 sm:w-14 h-12 sm:h-14 shrink-0">
                  <Image
                    src={withBasePath('/images/logos/kdu-logo.svg')}
                    alt="KDU Logo"
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <div className="text-xs text-white/35 leading-snug">
                  General Sir John Kotelawala<br />
                  Defence University
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase mb-3 sm:mb-4">
                Quick Links
              </h5>
              <div className="space-y-1.5 sm:space-y-2">
                {NAV_LINKS.slice(0, 4).map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/40 hover:text-white/80 transition-colors group"
                  >
                    <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event links */}
            <div>
              <h5 className="text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase mb-3 sm:mb-4">
                Event
              </h5>
              <div className="space-y-1.5 sm:space-y-2">
                {NAV_LINKS.slice(4).map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/40 hover:text-white/80 transition-colors group"
                  >
                    <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs text-white/25 text-center sm:text-left leading-relaxed">
              © 2026 Data Odyssey. AI & Data Science Club, General Sir John Kotelawala Defence University. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-white/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
