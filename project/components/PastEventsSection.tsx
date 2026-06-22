'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Images, X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react';
import Image from 'next/image';

const PHOTOS = [
  {
    src: 'public/images/past-events/Picture1-1.jpg',
    alt: 'Data Odyssey 2025 — Award Ceremony with Chief Guest',
    caption: 'Award Ceremony',
    tag: 'Ceremony',
  },
  {
    src: 'public/images/past-events/Picture2.jpg',
    alt: 'Data Odyssey 2025 — Certificate Presentation to Winners',
    caption: 'Certificate Presentation',
    tag: 'Winners',
  },
  {
    src: 'public/images/past-events/Picture3.jpg',
    alt: 'Data Odyssey 2025 — Champions: CartConnect Team',
    caption: 'Champions — CartConnect',
    tag: 'Champions',
  },
  {
    src: 'public/images/past-events/a4bbb096-1856-4768-82de-029701235593.jpg',
    alt: 'Data Odyssey 2025 — 1st Runner Up: NeuroBloom',
    caption: '1st Runner Up — NeuroBloom',
    tag: '1st Runner Up',
  },
  {
    src: 'public/images/past-events/80f8c12f-0909-4677-8450-4239b12aa1b2.jpg',
    alt: 'Data Odyssey 2025 — 1st Runner Up: DineFlow',
    caption: '1st Runner Up — DineFlow',
    tag: '1st Runner Up',
  },
];

// Tag colors
const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Ceremony:      { bg: 'bg-cyan-500/15',   text: 'text-cyan-300',   border: 'border-cyan-500/25' },
  Winners:       { bg: 'bg-blue-500/15',   text: 'text-blue-300',   border: 'border-blue-500/25' },
  Champions:     { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: 'border-yellow-500/25' },
  '1st Runner Up': { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/25' },
};

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: typeof PHOTOS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];
  const tag = TAG_COLORS[photo.tag] ?? TAG_COLORS['Ceremony'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl glass-card border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Image */}
        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Caption bar */}
        <div className="px-5 py-4 flex items-center justify-between gap-3 bg-[#050816]/90">
          <div>
            <div className={`inline-flex items-center text-[10px] font-mono px-2.5 py-1 rounded-full border mb-1.5 ${tag.bg} ${tag.text} ${tag.border}`}>
              {photo.tag}
            </div>
            <p className="text-white/80 text-sm font-medium">{photo.caption}</p>
            <p className="text-white/40 text-xs mt-0.5">Data Odyssey 2025 — KDU</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-white/30">
            {index + 1} / {photos.length}
          </div>
        </div>

        {/* Nav buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white/70 hover:text-white transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function PastEventsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((p) => (p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : 0));
  const next = () => setLightboxIndex((p) => (p !== null ? (p + 1) % PHOTOS.length : 0));

  // First 4 photos shown in grid, 5th hidden initially
  const visiblePhotos = PHOTOS.slice(0, 4);

  return (
    <>
      <section id="past-events" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

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
              <Images className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
              <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
                Past Events
              </span>
            </div>

            <h2
              className="font-bold text-white mb-3 sm:mb-4"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
              }}
            >
              DATA ODYSSEY{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                2025
              </span>
            </h2>

            <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
              Relive the highlights from our inaugural event — where the next generation of Sri Lanka's data science innovators competed, collaborated, and conquered.
            </p>

            {/* Event stat pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {[
                { label: 'Inter-Faculty Exhibition & Competition' },
                { label: 'KDU · 2025' },
                { label: 'Champions: CartConnect' },
              ].map((p) => (
                <span
                  key={p.label}
                  className="text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full glass border border-white/[0.08] text-white/50"
                >
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Photo grid — 2 cols on mobile, 2 cols on sm, 4 cols on lg */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-10">
            {visiblePhotos.map((photo, i) => {
              const tag = TAG_COLORS[photo.tag] ?? TAG_COLORS['Ceremony'];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => openLightbox(i)}
                  className="group relative cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden glass-card border border-white/[0.07] hover:border-cyan-500/30 transition-all duration-400"
                  style={{
                    // First two photos span full on mobile for the first row, 
                    // Last two are side by side
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-3 sm:p-4">
                    <div className={`inline-flex items-center text-[9px] sm:text-[10px] font-mono px-2 py-0.5 sm:py-1 rounded-full border mb-1.5 ${tag.bg} ${tag.text} ${tag.border}`}>
                      {photo.tag}
                    </div>
                    <p className="text-white/75 text-xs sm:text-sm font-medium leading-snug line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Animated border glow on hover */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-cyan-500/0 group-hover:border-cyan-500/25 transition-all duration-400 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* View More button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {/* View more photos — opens lightbox on last photo / can be hyperlinked */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); openLightbox(0); }}
              className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white/80 hover:text-white glass-card border border-white/[0.1] hover:border-cyan-500/30 rounded-xl transition-all duration-300 hover:bg-white/[0.03]"
            >
              <Images className="w-4 h-4 text-cyan-400 shrink-0" />
              View All Photos
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* View Event Details — placeholder hyperlink */}
            <a
              href="https://fmsh.kdu.ac.lk/department-of-languages/news/data-odyssey-2025-a-milestone-in-data-driven-innovation/"
              className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-300 shadow-glow-cyan hover:shadow-glow-lg-cyan"
            >
              View Event Details
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={PHOTOS}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
