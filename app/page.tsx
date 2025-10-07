'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <CTASection />
        {/* Additional content will go here */}
      </main>
      <Footer />
    </div>
  );
}
