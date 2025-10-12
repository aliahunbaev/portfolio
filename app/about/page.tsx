'use client';

import { useEffect } from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CalEmbed from '../components/CalEmbed';

export default function About() {
  const { ref: textRef, isVisible: textVisible } = useScrollFadeIn();
  const { ref: headerRef, isVisible: headerVisible } = useScrollFadeIn();

  useEffect(() => {
    document.title = 'About | Ali Ahunbáev';
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="px-4 pt-16 pb-4">
          <div 
            ref={headerRef}
            className={`scroll-fade-in ${headerVisible ? 'visible' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:gap-4 gap-0">
              <h1 
                className="text-2xl md:text-3xl lg:text-4xl text-black font-medium inline tracking-tight"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                Building Beauty.
              </h1>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-24">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-4">
            {/* Image */}
            <div className="w-80 lg:w-[40%]">
              <div className="aspect-square w-full">
                <img 
                  src="/handsomefounder.webp" 
                  alt="Ali Ahunbáev"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Text Content in white div */}
            <div className="w-full lg:w-[60%]">
              <div className="bg-white rounded-2xl p-6 md:p-4 h-full flex" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.06)' }}>
                <div 
                  ref={textRef}
                  className={`md:scroll-fade-in ${textVisible ? 'visible' : ''} max-w-xl lg:max-w-2xl`}
                >
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    Hi, I&apos;m Ali. It&apos;s nice to meet you!
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    I&apos;ve been drawing my whole life, and I got this identity as &quot;the artist&quot; reinforced by everyone around me. I&apos;m lucky this label got thrown on me - it shaped how I see the world and myself, and I realize how much harder it is to make stuff when you think you&apos;re &quot;just not creative.&quot;
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    In high school, my math teacher Mr. Moon told me I should study computer science. He suggested that combining technical ability with creative vision would yield beautiful results, and that idea stuck with me.
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    At 17, my best friend and I started Combat—a clothing company built around design and storytelling. We took it from zero to $30k in revenue. That experience taught me how the right visuals and narrative can turn ideas into movements.
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    I&apos;m currently a CS student at NYU, and I apply that same thinking to digital work. I build websites and visual identity for creative brands that understand the power of design in growing a business. I&apos;ve worked with brands like HardToKill (340k followers), built e-commerce systems, and created beautiful sites that convert.
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    My background blends technical ability (React, Next.js, Shopify) with design thinking. I can help figure out how to present your work online and build the full site. When I&apos;m not on client projects, I&apos;m working out, lounging at a jazz club, or working on Combat.
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    If you&apos;re building something you&apos;re excited about and want to work together, let&apos;s talk!
                  </p>
                  
                  <p className="text-sm text-gray-700 leading-normal" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    <a href="https://cal.com/ahunbaev/intro" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1">Book a call<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cal CTA Section */}
        <section className="pt-16 md:pt-24 lg:px-4">
          {/* Cal Embed - Full bleed on mobile/tablet, contained on desktop */}
          <CalEmbed />
        </section>
      </main>
      <Footer />
    </div>
  );
}
