'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-gray-200">
      <div className="px-6 md:px-8 mx-auto">
        {/* Main Footer Content */}
        <div className="grid pt-8 grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="text-2xl tracking-tighter font-semibold text-black block mb-4" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
              ahunbáev.com
            </Link>
            <p className="text-xs tracking-wider md:text-sm text-gray-500 font-sans mb-2">
              BUILDING BEAUTY
            </p>
            <p className="text-xs tracking-wider md:text-sm text-gray-500 font-sans mb-2">
              BROOKLYN, NYC
            </p>
            <p className="text-xs tracking-wider md:text-sm text-gray-500 font-sans">
              {currentTime} EST
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 
              className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
            >
              NAVIGATION
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/"
                className="text-base text-black"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                Work
              </Link>
              <Link 
                href="/about"
                className="text-base text-black"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                About
              </Link>
              <a 
                href="https://cal.com/ahunbaev/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-black"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 
              className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
            >
              CONNECT
            </h3>
            <div className="flex flex-col space-y-3">
              <a 
                href="mailto:hello@ahunbaev.com"
                className="text-base text-black"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                hello@ahunbaev.com
              </a>
              <a 
                href="https://instagram.com/ahunbaev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-black"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                Instagram
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-black"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Full Width */}
      <div className="border-t border-gray-200">
        <div className="px-6 md:px-8 py-4 flex justify-center items-center">
          <p 
            className="text-sm text-gray-500 text-center"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            Encourage the Beautiful, for the Useful encourages itself.
          </p>
        </div>
      </div>
    </footer>
  );
}

