'use client';

import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFadeIn();
  const { ref: textRef, isVisible: textVisible } = useScrollFadeIn();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Hero Image */}
          <section className="px-6 pt-16">
            <div className="w-full">
              <div className="aspect-[4/5] w-full">
                <img 
                  src="https://picsum.photos/800/600?random=about" 
                  alt="Ali Ahunbáev"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
            </div>
          </section>

          {/* Header Text */}
          <section className="px-6 pt-12">
            <div className="max-w-4xl mx-auto text-left">
              <h1 
                ref={headerRef}
                className={`text-3xl text-black leading-9 tracking-tight scroll-fade-in ${headerVisible ? 'visible' : ''}`}
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                What&apos;s up, I&apos;m Ali.
              </h1>
            </div>
          </section>

          {/* Paragraph Section */}
          <section className="px-6 pt-8 pb-16">
            <div className="max-w-4xl mx-auto">
              <div 
                ref={textRef}
                className={`md:scroll-fade-in ${textVisible ? 'visible' : ''}`}
              >
              <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                You&apos;ve gotten this far and now I consider us friends. It&apos;s nice to meet you! I&apos;m a designer and developer who builds digital products that feel good to use and help people move forward. I&apos;m passionate about creating tools that combine beautiful design with real functionality—things people actually want to open every day.
              </p>
              
              <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                I&apos;m currently studying Computer Science at NYU while running a freelance practice where I design and build websites for founders, creatives, and small businesses. I specialize in web design, brand identity, and turning ideas into working products using tools like Figma, Webflow, and Next.js.
              </p>
              
              <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                I come from a background that blends creativity and technical craft—I care as much about how something looks as I do about how it works. My philosophy is simple: build things that matter, ship them fast, and make the process feel like play instead of work.
              </p>
              
              <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Outside of design and code, I&apos;m training as a boxer, writing essays about productivity and creative work, and making videos documenting what I&apos;m learning along the way. I&apos;m obsessed with stories of people who built something from nothing—whether that&apos;s a product, a brand, or a life they&apos;re proud of.
              </p>
              
              <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                I&apos;m a big fan of honest work, clear thinking, and people who care about craft. During my free time, you can find me running through Central Park, reading biographies of builders, or working on my next project at a cafe in the city.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Check my Instagram @ahunbaev for work updates and creative process. I also write a newsletter called Playfighter where I share thoughts on productivity, creativity, and design. Thanks for stopping by. If you need a website, want to collaborate, or just want to talk about what you&apos;re building—reach out.
              </p>
            </div>
          </div>
        </section>
        </div>

        {/* Desktop/Tablet Split Layout */}
        <div className="hidden md:flex gap-20">
          {/* Left Side - Image */}
          <div className="w-1/2 px-6 md:px-8 pt-20">
            <div className="aspect-[4/5] w-full">
              <img 
                src="https://picsum.photos/800/600?random=about" 
                alt="Ali Ahunbáev"
                className="w-full h-full object-cover rounded-none"
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="w-1/2 px-6 md:px-8 pt-20 pb-24">
            {/* Header Text */}
            <div className="mb-8">
              <h1 
                ref={headerRef}
                className={`text-3xl lg:text-4xl text-black leading-9 tracking-tight scroll-fade-in ${headerVisible ? 'visible' : ''}`}
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                What&apos;s up, I&apos;m Ali.
              </h1>
            </div>

            {/* Paragraph Section */}
            <div 
              ref={textRef}
              className={`scroll-fade-in ${textVisible ? 'visible' : ''}`}
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                You&apos;ve gotten this far and now I consider us friends. It&apos;s nice to meet you! I&apos;m a designer and developer who builds digital products that feel good to use and help people move forward. I&apos;m passionate about creating tools that combine beautiful design with real functionality—things people actually want to open every day.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                I&apos;m currently studying Computer Science at NYU while running a freelance practice where I design and build websites for founders, creatives, and small businesses. I specialize in web design, brand identity, and turning ideas into working products using tools like Figma, Webflow, and Next.js.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                I come from a background that blends creativity and technical craft—I care as much about how something looks as I do about how it works. My philosophy is simple: build things that matter, ship them fast, and make the process feel like play instead of work.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Outside of design and code, I&apos;m training as a boxer, writing essays about productivity and creative work, and making videos documenting what I&apos;m learning along the way. I&apos;m obsessed with stories of people who built something from nothing—whether that&apos;s a product, a brand, or a life they&apos;re proud of.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                I&apos;m a big fan of honest work, clear thinking, and people who care about craft. During my free time, you can find me running through Central Park, reading biographies of builders, or working on my next project at a cafe in the city.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed " style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Check my Instagram @ahunbaev for work updates and creative process. I also write a newsletter called Playfighter where I share thoughts on productivity, creativity, and design. Thanks for stopping by. If you need a website, want to collaborate, or just want to talk about what you're building—reach out.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="px-6 md:px-8 py-16 md:py-24">
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
