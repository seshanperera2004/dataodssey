'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const MS_FORM_URL = 'https://forms.office.com/r/YOUR_FORM_ID'; // Replace with actual MS Form URL

const NAV_ITEMS = [
  { label: 'About', href: '#about', external: false },
  { label: 'Timeline', href: '#timeline', external: false },
  { label: 'Eligibility', href: '#eligibility', external: false },
  { label: 'Prizes', href: '#prizes', external: false },
  { label: 'Past Events', href: '#past-events', external: false },
  { label: 'Industry', href: '#industry', external: false },
  { label: 'Contact', href: '#contact', external: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNav = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) { window.open(href, '_blank', 'noopener noreferrer'); return; }
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050816]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">

            {/* Logo — AIclub3d image + text */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group shrink-0"
            >
              {/* Logo image with transparent background */}
              <div className="relative w-11 sm:w-13 lg:w-14 h-11 sm:h-13 lg:h-14 shrink-0" style={{width:'clamp(2.5rem,5vw,3.5rem)',height:'clamp(2.5rem,5vw,3.5rem)'}}>
                <Image
                  src="/images/logos/club3d.png"
                  alt="DatAInspire Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_10px_rgba(0,245,255,0.3)] group-hover:drop-shadow-[0_0_18px_rgba(0,245,255,0.55)] transition-all duration-300"
                  sizes="56px"
                  priority
                />
              </div>
              {/* Text */}
              <div className="leading-none">
                <div
                  className="font-bold text-white tracking-wider leading-none"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(0.72rem, 2.2vw, 0.95rem)' }}
                >
                  DATA ODYSSEY
                </div>
                <div className="text-[9px] sm:text-[10px] text-cyan-400/70 tracking-[0.22em] font-mono mt-0.5">
                  2026
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href, item.external)}
                    className={`relative px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive ? 'text-cyan-400' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => window.open(MS_FORM_URL, '_blank', 'noopener noreferrer')}
                className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 rounded-lg sm:rounded-xl transition-all duration-300 shadow-glow-cyan hover:shadow-glow-lg-cyan whitespace-nowrap"
              >
                Register Now
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/[0.05] transition-all"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-4 sm:w-5 h-4 sm:h-5" /> : <Menu className="w-4 sm:w-5 h-4 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-[#050816]/98 backdrop-blur-xl border-b border-white/[0.06] lg:hidden max-h-[calc(100svh-3.5rem)] overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
                <div className="space-y-0.5 sm:space-y-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => handleNav(item.href, item.external)}
                      className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-3 pb-2 border-t border-white/[0.04] mt-3">
                  <button
                    onClick={() => window.open(MS_FORM_URL, '_blank', 'noopener noreferrer')}
                    className="w-full py-3 text-sm font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
                  >
                    Register Your Team
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
