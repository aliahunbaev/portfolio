'use client';

import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

export default function CTASection() {
  const { ref, isVisible } = useScrollFadeIn();
  
  // Get current month and year
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = currentDate.getFullYear().toString().slice(-2);
  
  return (
    <section className="px-6 md:px-8 py-16 md:py-24">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-4 md:mb-6">
          <h2 
            className="text-lg md:text-xl text-gray-400 uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
          >
            BOOKING PROJECTS FOR {month} '{year}
          </h2>
        </div>
 
 
        <div className="w-full md:max-w-none mx-auto">
          <div 
            ref={ref}
            className={`bg-black rounded-2xl aspect-[4/3] md:aspect-[8/3] md:h-auto flex flex-col justify-center items-center px-6 py-16 md:p-12 text-center scroll-fade-in ${isVisible ? 'visible' : ''}`}
          >
            <h3 
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-12 font-medium"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              Let's make some magic.
            </h3>

            {/* Buttons */}
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 md:justify-center">
              {/* Primary Button */}
                <a 
                  href="https://cal.com/ahunbaev/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto md:flex-1 md:max-w-xs bg-white text-black py-3 md:py-2 px-6 rounded-full font-medium text-lg md:text-base uppercase flex items-center justify-center"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  BOOK A CALL
                </a>

                {/* Secondary Button */}
                <button 
                  className="w-full md:w-auto md:flex-1 md:max-w-xs border-2 border-white text-white py-3 md:py-2 px-6 rounded-full font-medium text-lg md:text-base uppercase"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  PROJECT FORM
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
