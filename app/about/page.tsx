'use client';

import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const { ref: textRef, isVisible: textVisible } = useScrollFadeIn();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="px-4 py-20 md:py-0">
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
              <div className="bg-white rounded-2xl p-6 md:p-4 h-full flex">
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

        {/* CTA Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto">
            <div className="bg-black rounded-2xl aspect-[4/3] md:aspect-[8/3] md:h-auto flex flex-col justify-center items-center px-6 py-16 md:p-12 text-center">
              {/* Title */}
              <h3 
                className="text-4xl md:text-5xl lg:text-6xl text-white mb-12 font-medium"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                Let&apos;s get to work.
              </h3>

              {/* Buttons */}
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 md:justify-center">
                {/* Primary Button */}
                <a 
                  href="https://cal.com/ahunbaev/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto md:flex-1 md:max-w-xs bg-white text-black py-3 md:py-2 px-6 rounded-full font-medium text-lg  uppercase flex items-center justify-center"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  BOOK A CALL
                </a>

                {/* Secondary Button */}
                <button 
                  className="w-full md:w-auto md:flex-1 md:max-w-xs border-2 border-white text-white py-3 md:py-2 px-6 rounded-full font-medium text-lg  uppercase"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  PROJECT FORM
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
