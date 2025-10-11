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
}

export const projects: Project[] = [
  {
    id: 'hardtokill',
    title: 'Hardtokill',
    subtitle: 'Brand Identity & Web Design',
    headerText: 'A Curated Mood of Triumph.',
    description: 'A bold fitness brand identity system designed for champions who refuse to quit.',
    introText: 'Hardtokill is a premium fitness brand that embodies resilience and unstoppable determination. We crafted a complete brand identity that captures the raw energy and dedication of athletes who push beyond their limits. The visual system combines brutal minimalism with powerful typography to create a presence that commands attention in the competitive fitness space.',
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
    websiteUrl: 'https://hardtokillclo.com'
  },
  {
    id: 'combat',
    title: 'Combat',
    subtitle: 'E-commerce Platform',
    headerText: 'Precision Meets Performance.',
    description: 'A sophisticated e-commerce platform for premium combat sports equipment.',
    introText: 'Combat represents the intersection of brutal sport and refined design. This e-commerce platform was built to showcase premium martial arts equipment with the respect and attention it deserves. Every detail from product photography to checkout flow was designed to feel as precise and intentional as the training these products enable.',
    thumbnail: '/projects/combat/combatvertical.png.webp',
    thumbnailHorizontal: '/projects/combat/combathorizontal.png.webp',
    coverImage: '/projects/combat/combathero.png.webp',
    images: [
      { url: '/projects/combat/combat1.png.webp', size: 'full' },
    ],
    showcaseSections: [
      {
        title: 'CONTENT STRATEGY',
        images: [
          { url: '/projects/combat/combatjournal.png.webp', urlMobile: '/projects/combat/combatjournal2.png.webp', caption: 'Training Journal' },
          { url: '/projects/combat/combatarticles.png.webp', caption: 'Article System' },
        ]
      },
      {
        title: 'USER EXPERIENCE',
        images: [
          { url: '/projects/combat/library.gif', caption: 'Interactive Library' },
          { url: '/projects/combat/combatemail.png.webp', caption: 'Email Marketing' },
        ]
      },
      {
        title: 'SOCIAL MEDIA ASSETS',
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
    websiteUrl: 'https://combat.com'
  },
  {
    id: 'hawa-studio',
    title: 'Hawa Studio',
    subtitle: 'Creative Studio Website',
    headerText: 'Thoughtful Design, Timeless Impact.',
    description: 'An elegant portfolio website for a creative studio specializing in visual storytelling.',
    introText: 'Hawa Studio needed a digital home that reflected their approach to creative work—thoughtful, refined, and deeply human. We designed a website that puts their projects at center stage while maintaining an elegant restraint that lets the work breathe. The result is a portfolio experience that feels both contemporary and timeless.',
    thumbnail: 'https://picsum.photos/1200/800?random=3',
    coverImage: 'https://picsum.photos/1200/800?random=3',
    images: [
      { url: 'https://picsum.photos/1200/900?random=31', size: 'full' },
      { url: 'https://picsum.photos/600/800?random=32', size: 'half', caption: 'Typography system showcasing Freight Display' },
      { url: 'https://picsum.photos/600/800?random=33', size: 'half' },
      { url: 'https://picsum.photos/1200/800?random=34', size: 'full', caption: 'Project case study template' },
      { url: 'https://picsum.photos/800/600?random=35', size: 'two-thirds' },
      { url: 'https://picsum.photos/400/600?random=36', size: 'third' },
    ],
    year: '2024',
    services: ['Web Design', 'Development', 'Content Strategy'],
    technologies: ['Webflow', 'Custom CSS', 'GSAP'],
    websiteUrl: 'https://hawastudio.com'
  },
  {
    id: 'beau-flaneur',
    title: 'Beau Flâneur',
    subtitle: 'Fashion Brand Identity',
    headerText: 'Wandering with Purpose.',
    description: 'A sophisticated brand identity for a modern menswear label rooted in timeless elegance.',
    introText: 'Beau Flâneur celebrates the art of wandering with purpose—the modern man who moves through the world with intention and style. We developed a complete brand identity that balances European sophistication with contemporary minimalism. From monogram design to packaging, every touchpoint reinforces the brand\'s commitment to craftsmanship and quiet luxury.',
    thumbnail: 'https://picsum.photos/1200/800?random=4',
    coverImage: 'https://picsum.photos/1200/800?random=4',
    images: [
      { url: 'https://picsum.photos/800/1000?random=41', size: 'half' },
      { url: 'https://picsum.photos/800/1000?random=42', size: 'half', caption: 'Lookbook photography' },
      { url: 'https://picsum.photos/1200/700?random=43', size: 'full' },
      { url: 'https://picsum.photos/400/600?random=44', size: 'third', caption: 'Packaging design details' },
      { url: 'https://picsum.photos/800/600?random=45', size: 'two-thirds' },
      { url: 'https://picsum.photos/1200/800?random=46', size: 'full', caption: 'Brand guidelines spread' },
    ],
    year: '2024',
    services: ['Brand Identity', 'Packaging Design', 'Art Direction'],
    technologies: ['Figma', 'Adobe Suite', 'Webflow'],
    websiteUrl: 'https://beauflaneur.com'
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
