'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 px-4 py-2 z-50">
        <nav className={`bg-white rounded-2xl px-4 py-3 md:px-4 md:py-3 shadow-sm transition-all duration-300 ${
          isMenuOpen ? 'h-[calc(100vh-2rem)] md:h-auto flex flex-col' : ''
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo and subtext */}
            <div className="flex flex-col">
              <Link href="/" className="text-xl tracking-tight md:text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                Ahunbáev
              </Link>
              {/* <p className="text-xs tracking-wider md:text-sm text-gray-500 font-sans">
                BROOKLYN, NYC | {currentTime} EST
              </p> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-lg font-light text-black uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
              >
                WORK
              </Link>
              <Link
                href="/about"
                className="text-lg font-light text-black uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
              >
                ABOUT
              </Link>
              <a
                href="https://cal.com/ahunbaev/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white border border-black px-4 py-0 rounded-full text-lg font-light uppercase tracking-widest hover:bg-transparent hover:text-black hover:border-black"
                style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
              >
                BOOK A CALL
              </a>
            </div>

            {/* Mobile Hamburger menu button */}
            <button
              onClick={toggleMenu}
              className="relative w-8 h-6 flex flex-col justify-center items-center space-y-1.5 focus:outline-none md:hidden cursor-pointer z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-8 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1 scale-x-110' : 'scale-x-100'
                }`}
              />
              <span
                className={`block w-8 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1 scale-x-110' : 'scale-x-100'
                }`}
              />
            </button>
          </div>

          {/* Mobile menu content - part of the same white container */}
          <div
            className={`md:hidden flex-1 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
            }`}
          >
            <div className="flex flex-col items-center justify-center flex-1 px-8 py-12">
              {/* Navigation Links */}
              <div className="flex flex-col items-center space-y-8 mb-16">
                <Link
                  href="/"
                  className="text-4xl font-light text-black uppercase"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  WORK
                </Link>
                <Link
                  href="/about"
                  className="text-4xl font-light text-black uppercase"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <a
                  href="https://cal.com/ahunbaev/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl font-light text-black uppercase"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </a>
              </div>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-8">
                {/* Instagram Icon */}
                <a
                  href="https://instagram.com/ahunbaev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                
                {/* Email Icon */}
                <a
                  href="mailto:hello@ahunbaev.com"
                  className="text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
}
