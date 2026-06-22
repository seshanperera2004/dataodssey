'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EventOverview from '@/components/EventOverview';
import PrizesSection from '@/components/PrizesSection';
import TimelineSection from '@/components/TimelineSection';
import ScheduleSection from '@/components/ScheduleSection';
import EligibilitySection from '@/components/EligibilitySection';
import PastEventsSection from '@/components/PastEventsSection';
import IndustryImpact from '@/components/IndustryImpact';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: loading ? 'none' : 'auto',
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <SectionDivider />
          <EventOverview />
          <SectionDivider />
          <PrizesSection />
          <SectionDivider />
          <TimelineSection />
          <SectionDivider />
          <ScheduleSection />
          <SectionDivider />
          <EligibilitySection />
          <SectionDivider />
          <PastEventsSection />
          <SectionDivider />
          <IndustryImpact />
          <SectionDivider />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="section-divider" />
    </div>
  );
}
