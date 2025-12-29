'use client';

import Link from 'next/link';

const links = [
  {
    title: 'View My Work',
    description: 'Portfolio & case studies',
    href: '/',
    image: '/link4.jpg',
    gradient: 'from-black/70 to-transparent',
  },
  {
    title: 'Book a Call',
    description: 'Start your project',
    href: 'https://cal.com/ahunbaev/intro',
    image: '/handsomefounder.webp', // Replace with call/meeting image
    gradient: 'from-black/70 to-transparent',
  },
  {
    title: 'YouTube Channel',
    description: 'Design, business, & life in NYC',
    href: 'https://youtube.com/@ahunbaev',
    image: '/link1.jpg',
    gradient: 'from-red-500/80 to-transparent',
  },
  {
    title: 'Playfighter Newsletter',
    description: 'Letters on building a life of play',
    href: 'https://playfighter.substack.com',
    image: '/link5.png',
    gradient: 'from-blue-500/80 to-transparent',
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen">
      <main className="px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <div className="mb-8 md:mb-12">
            <div className="mb-4">
              <img
                src="/pfp.jpg"
                alt="Ali Ahunbaev"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover object-top"
                style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.06)', objectPosition: 'center 30%' }}
              />
            </div>
            <div>
              <h1 
                className="text-black tracking-tight leading-tight"
                style={{ 
                  fontFamily: 'var(--font-lora), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 6vw, 2.5rem)'
                }}
              >
                Ali Ahunbáev
              </h1>
              <h2 
                className="text-gray-400 tracking-tight leading-tight italic"
                style={{ 
                  fontFamily: 'var(--font-lora), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 6vw, 2.5rem)'
                }}
              >
                Web Design for Creative Brands
              </h2>
            </div>
          </div>

          {/* Image Card Links */}
          <div className="space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block group"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]">
                  {/* Background Image */}
                  <img
                    src={link.image}
                    alt={link.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay - bottom only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <h2 
                      className="text-2xl md:text-3xl lg:text-4xl text-white mb-1 md:mb-2 tracking-tight group-hover:italic"
                      style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                    >
                      {link.title}
                    </h2>
                    <p 
                      className="text-xs md:text-sm text-white/90 uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                    >
                      {link.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

