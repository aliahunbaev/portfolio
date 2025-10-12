export interface ProjectImage {
  url: string;
  caption?: string;
  size: 'full' | 'half' | 'third' | 'two-thirds';
}

export interface ShowcaseImage {
  url: string;
  caption: string;
  urlMobile?: string; // Different image for mobile/medium screens
}

export interface ShowcaseSection {
  title: string;
  images: ShowcaseImage[];
  hasGridBackground?: boolean; // Default true
  useGridLayout?: boolean; // Use grid system instead of flex
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  headerText: string;
  description: string;
  introText: string;
  thumbnail: string; // For homepage card (vertical aspect on desktop)
  thumbnailHorizontal?: string; // For homepage card (horizontal aspect on mobile)
  coverImage: string; // For case study hero
  images: ProjectImage[];
  showcaseSections?: ShowcaseSection[]; // Multiple showcase sections
  endImage?: string; // Full-bleed image at the very end
  year: string;
  services: string[];
  technologies: string[];
  websiteUrl?: string;
  instagramUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'hardtokill',
    title: 'Hardtokill',
    subtitle: 'Brand Identity & Web Design',
    headerText: 'A Curated Mood of Triumph.',
    description: 'A bold fitness brand identity system designed for champions who refuse to quit.',
    introText: 'Hardtokill is a media company built around triumph and resilience. Over four years, they grew to 340k followers by curating powerful imagery, stories, and interviews with people who embody their ethos from UFC fighters to artists pushing boundaries. As they transitioned into a full media business, they needed infrastructure to support product drops, editorial content, and community building. I built them a Shopify-integrated website with a dynamic CMS for managing both media and products, email capture for upcoming releases, and a clean design that preserves their aesthetic.',
    thumbnail: '/projects/hardtokill/verticalhtk.png.webp',
    thumbnailHorizontal: '/projects/hardtokill/horizhtk.png.webp',
    coverImage: '/projects/hardtokill/mainhtk.png.webp',
    images: [
      { url: '/projects/hardtokill/htkhero.png.webp', size: 'full' },
    ],
    showcaseSections: [
      {
        title: 'RESPONSIVE HERO DESIGN',
        images: [
          { url: '/projects/hardtokill/htk1.png.webp', caption: 'Desktop Hero View' },
          { url: '/projects/hardtokill/htk2.png.webp', caption: 'Mobile Experience' },
        ]
      },
      {
        title: 'SHOPIFY INTEGRATION',
        images: [
          { url: '/projects/hardtokill/htk3.png.webp', caption: 'Product page dynamically pulling content through Shopify\'s product CMS' },
          { url: '/projects/hardtokill/htk4.png.webp', caption: 'Interview content showing through Shopify\'s blog CMS' },
        ]
      },
      {
        title: 'CURATED SITE PHOTOGRAPHY',
        hasGridBackground: false,
        useGridLayout: true,
        images: [
          { url: '/projects/hardtokill/htk5.png.webp', caption: 'About Page' },
          { url: '/projects/hardtokill/htk6.png.webp', caption: 'Mobile Contact' },
          { url: '/projects/hardtokill/htk7.png.webp', caption: 'Desktop Contact' },
        ]
      }
    ],
    year: '2024',
    services: ['Brand Identity', 'Web Design', 'Art Direction'],
    technologies: ['Next.js', 'Framer Motion', 'Figma'],
    websiteUrl: 'https://hardtokillclo.com',
    instagramUrl: 'https://instagram.com/hardtokill'
  },
  {
    id: 'combat',
    title: 'Combat',
    subtitle: 'E-commerce Platform',
    headerText: 'Precision Meets Performance.',
    description: 'A sophisticated e-commerce platform for premium combat sports equipment.',
    introText: 'Combat is a creative community and clothing brand built around the idea that true beauty comes through struggle. We grew the brand from an Instagram page to a multi-faceted platform releasing clothes, publishing a magazine, and hosting events for builders and artists. I built the digital infrastructure to support this expansion: a product system with editorial articles explaining each release, a curated library with sorting functionality for visual inspiration, and email capture to transition our Instagram audience into a community ready for events and future tools.',
    thumbnail: '/projects/combat/combatvertical.png.webp',
    thumbnailHorizontal: '/projects/combat/combathorizontal.png.webp',
    coverImage: '/projects/combat/combathero.png.webp',
    images: [
      { url: '/projects/combat/combat1.png.webp', size: 'full' },
    ],
    showcaseSections: [
      {
        title: 'MAGAZINE STRUCTURE',
        images: [
          { url: '/projects/combat/combatjournal.png.webp', urlMobile: '/projects/combat/combatjournal2.png.webp', caption: 'Print magazine digitized and converted to blog format, split into chapters' },
          { url: '/projects/combat/combatarticles.png.webp', caption: 'Dynamic blog content' },
        ]
      },
      {
        title: 'USER EXPERIENCE',
        images: [
          { url: '/projects/combat/library.gif', caption: 'Interactive library with Next.js sorting' },
          { url: '/projects/combat/combatemail.png.webp', caption: 'Mailchimp email integration' },
        ]
      },
      {
        title: 'SOCIAL MEDIA DESIGN',
        hasGridBackground: false,
        useGridLayout: true,
        images: [
          { url: '/projects/combat/combatg1.png.webp', caption: '' },
          { url: '/projects/combat/combatg2.png.webp', caption: '' },
          { url: '/projects/combat/combatg3.png.webp', caption: '' },
          { url: '/projects/combat/combatg4.png.webp', caption: '' },
        ]
      }
    ],
    year: '2024',
    services: ['E-commerce Design', 'Web Development', 'Photography Direction'],
    technologies: ['Shopify', 'Liquid', 'React'],
    websiteUrl: 'https://combatny.com',
    instagramUrl: 'https://instagram.com/combat.ny'
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getNextProject(currentId: string): Project | null {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
}

export function getPreviousProject(currentId: string): Project | null {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  if (currentIndex === -1 || currentIndex === 0) {
    return projects[projects.length - 1];
  }
  return projects[currentIndex - 1];
}
