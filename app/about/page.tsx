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
        <section className="px-4 pt-16 pb-4 md:py-10">
          <div 
            ref={headerRef}
            className={`scroll-fade-in ${headerVisible ? 'visible' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:gap-4 gap-0">
              <h1 
                className="text-2xl md:text-3xl lg:text-4xl text-black font-medium inline tracking-tight"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                Hi, I&apos;m Ali.{' '}
              </h1>
              <span 
                className="text-2xl md:text-3xl lg:text-4xl text-gray-400 font-medium inline tracking-tight"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                It&apos;s nice to meet you!
              </span>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-24">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-4">
            {/* Image */}
            <div className="w-60 lg:w-[40%]">
              <div className="aspect-square w-full">
                <img 
                  src="https://picsum.photos/800/600?random=about" 
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
                  <p className="text-sm  text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    I&apos;m Ali, a designer and developer studying Computer Science at NYU. I build digital products that combine beautiful design with real functionality.
                  </p>
                  
                  <p className="text-sm  text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    I run a freelance practice designing and building websites for founders, creatives, and small businesses. I specialize in web design, brand identity, and turning ideas into working products using Figma, Webflow, and Next.js.
                  </p>
                  
                  <p className="text-sm  text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    My philosophy is simple: build things that matter, ship them fast, and make the process feel like play instead of work.
                  </p>
                  
                  <p className="text-sm  text-gray-700 leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    Outside of work, I&apos;m training as a boxer and writing about productivity and creative work. If you need a website or want to collaborate, reach out.
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
