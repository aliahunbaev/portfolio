'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();

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

  // Disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 px-4 py-2 z-50">
        <nav 
          className={`bg-white rounded-2xl px-4 py-3 md:px-4 md:py-3 transition-all duration-300 ${
          isMenuOpen ? 'h-[calc(100dvh-1rem)] md:h-auto flex flex-col overflow-y-auto' : ''
        }`}
          style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.06)' }}
        >
          <div className="flex items-center justify-between">
            {/* Logo and subtext */}
            <div className="flex flex-col">
              <Link href="/" className="text-xl tracking-tight md:text-2xl font-semibold text-black hover:italic" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
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
                className="bg-black text-white border border-black px-4 py-0 rounded-full text-lg font-light uppercase tracking-widest"
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
            <div className="flex flex-col justify-between items-center flex-1 px-8 py-4 pb-8">
              {/* Navigation Links - Centered vertically */}
              <div className="flex flex-col items-center space-y-8 flex-1 justify-center">
                <Link
                  href="/"
                  className="text-5xl font-light text-black uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  WORK
                </Link>
                <Link
                  href="/about"
                  className="text-5xl font-light text-black uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <a
                  href="https://cal.com/ahunbaev/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-5xl font-light text-black uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </a>
              </div>
              
              {/* Social Icons and Copyright - Bottom aligned */}
              <div className="flex flex-col items-center space-y-6">
                {/* Social Icons - Spread out */}
                <div className="flex items-center justify-between w-full">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/alizahunbaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                    </svg>
                  </a>
                  
                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@ahunbaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/aliahunbaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  {/* Substack */}
                  <a
                    href="https://playfighter.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                    </svg>
                  </a>
                </div>

                {/* Copyright Text */}
                <p 
                  className="text-xs text-gray-500 text-center"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  © 2025 Ali Ahunbáev. All Rights Reserved. New York, NY.
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-20 md:h-20"></div>

      {/* Social Icons - Non-fixed, below navbar - Only on work page */}
      {pathname === '/' && (
        <div className="hidden md:block px-8 mt-1">
          <div className="flex items-center gap-8">
            <a
              href="https://instagram.com/alizahunbaev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="white"/>
              </svg>
            </a>
            
            <a
              href="https://youtube.com/@ahunbaev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/aliahunbaev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://playfighter.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
