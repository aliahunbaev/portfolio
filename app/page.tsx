'use client';

import { useEffect, useState } from 'react';

const links = [
  {
    title: 'Combát',
    description: 'Community & Creative Studio',
    href: 'https://instagram.com/combatcreatif',
    image: '/combatlink.png',
  },
  {
    title: 'YouTube',
    description: 'Design, business, & life in NYC',
    href: 'https://youtube.com/@playfighter',
    image: '/link1.jpg',
  },
  {
    title: 'Playfighter',
    description: 'Letters on building a life of play',
    href: 'https://playfighter.substack.com',
    image: '/link5.png',
  },
];

const aboutSections = [
  {
    id: 'how-i-started',
    title: 'How I Started',
    content: [
      "I got rejected from every school I applied to out of high school. Princeton, Stanford, all of them. So I went to community college.",
      "That rejection pushed me into monk mode. I woke up at 3-4am every day, trained hard, studied harder, and lived with militant discipline. It worked. I got into NYU.",
      "But once I got to NYU, something shifted. New city, new people, new chaos. The discipline that got me there started to slip. I drifted for a semester.",
      "Now I'm rebuilding. Getting back to the training, the focus, the early mornings. But this time it's not about proving myself to schools. It's about building Combat."
    ]
  },
  {
    id: 'what-im-building',
    title: "What I'm Building",
    content: [
      "Combat is what I spend most of my time on. It's a community and studio for creative people—the ones who want to build things, make art, train hard, live intentionally. The warrior-artist duality. Discipline and beauty together.",
      "I'm making software tools (fitness tracking, life planning, inspiration curation), physical products (clothing, journals, gear), and media (magazine, videos, gatherings). All under one philosophy: fight for your creative life."
    ]
  },
  {
    id: '10-year-vision',
    title: '10-Year Vision',
    content: [
      "The vision is simple. By 30, I want Combat to be a real company—store, cafe, community space, products that matter. I want generational wealth, cultural impact, creative freedom.",
      "I want to be like Pharrell or Virgil—someone who built their own platform and used it to make beautiful things forever.",
      "I know I'll probably need a job after graduation—somewhere like Figma or Notion—to fund Combat while it grows. That's fine. The job is just the engine. Combat is the work.",
      "I'm 19. I have 11 years until 30. That's 3,650 days to build this. I'm going all in."
    ]
  },
  {
    id: 'who-im-looking-for',
    title: "Who I'm Looking For",
    content: [
      "If you're building something, or you care about this kind of work, reach out. My friends tend to be creative, ambitious, and a little obsessed.",
      "If that's you, let's talk."
    ]
  }
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      const timeString = now.toLocaleTimeString('en-US', options);
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        {/* Left Column - Profile & Info */}
        <div className="relative min-h-screen border-r border-gray-200 lg:overflow-y-auto lg:max-h-screen">
          {/* Location & Time - Top Left */}
          <div className="absolute top-0 left-0 px-4 py-6 lg:px-6 lg:py-8 z-10">
            <div className="flex items-center gap-2 text-gray-400 font-mono text-xs tracking-widest uppercase">
              <p>Brooklyn, NY</p>
              <span>•</span>
              <p>{currentTime}</p>
              <p>EST</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 py-24 lg:px-6 lg:pt-32">
            <div className="lg:max-w-xl mx-auto lg:mx-0">
              {/* Profile Photo */}
              <div className="mb-6">
                <img
                  src="/photo.webp"
                  alt="Ali Ahunbaev"
                  draggable="false"
                  className="w-full max-w-sm rounded-3xl object-cover select-none"
                  style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.06)' }}
                />
              </div>

              {/* Name & Subtitle */}
              <div className="mb-12">
                <div className="select-none mb-4">
                  <h1
                    className="text-3xl md:text-4xl text-gray-900 tracking-tight leading-none mb-1"
                    style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                  >
                    Ali Ahunbáev
                  </h1>
                  <h2
                    className="text-3xl md:text-4xl text-blue-400 tracking-tight italic leading-none"
                    style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                  >
                    Designer & Developer
                  </h2>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:ali@ahunbaev.com"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Email"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/alizahunbaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/aliahunbaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Mobile: Link Cards */}
              <div className="lg:hidden space-y-4 mb-12 py-12 -mx-4 px-4 lg:-mx-12 lg:px-12 border-t border-b border-gray-200">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative aspect-[2/1] rounded-3xl overflow-hidden transition-all duration-200">
                      <img
                        src={link.image}
                        alt={link.title}
                        draggable="false"
                        className="absolute inset-0 w-full h-full object-cover select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <h2
                          className="text-xl text-white mb-1 tracking-tight group-hover:italic"
                          style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                        >
                          {link.title}
                        </h2>
                        <p className="text-xs text-white/90 uppercase font-mono tracking-widest">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Expandable About Sections */}
              <div className="space-y-3">
                {aboutSections.map((section) => {
                  const isExpanded = expandedSections.includes(section.id);
                  return (
                    <div key={section.id} className={`border border-gray-200 rounded-3xl overflow-hidden transition-colors ${isExpanded ? 'bg-gray-50' : ''}`}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <h3 className="text-sm uppercase text-gray-600 text-left font-mono tracking-wider">
                          {section.title}
                        </h3>
                        <span className="text-gray-400 text-base flex-shrink-0 ml-4 font-mono">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4">
                          <div className="space-y-3 text-gray-600 text-sm font-mono leading-relaxed pt-2">
                            {section.content.map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-4 pb-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <p>© {new Date().getFullYear()} Ali Ahunbáev</p>
                  <a
                    href="https://www.youtube.com/watch?v=UF8uR6Z6KLc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-widest uppercase hover:text-gray-600 transition-colors"
                  >
                    Stay Hungry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Links (Desktop Only) */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center px-6 py-12 lg:px-8 lg:py-16 bg-white">
          <div className="space-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative aspect-[3/1] rounded-3xl overflow-hidden transition-all duration-200">
                  {/* Background Image */}
                  <img
                    src={link.image}
                    alt={link.title}
                    draggable="false"
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h2
                      className="text-2xl text-white mb-1 tracking-tight group-hover:italic"
                      style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                    >
                      {link.title}
                    </h2>
                    <p className="text-xs text-white/90 uppercase font-mono tracking-widest">
                      {link.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
