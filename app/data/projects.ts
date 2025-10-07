export interface ProjectImage {
  url: string;
  caption?: string;
  size: 'full' | 'half' | 'third' | 'two-thirds';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  headerText: string;
  description: string;
  introText: string;
  coverImage: string;
  images: ProjectImage[];
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
    coverImage: 'https://picsum.photos/1200/800?random=1',
    images: [
      { url: 'https://picsum.photos/1200/800?random=11', size: 'full' },
      { url: 'https://picsum.photos/600/800?random=12', size: 'half', caption: 'Logo iterations exploring strength and movement' },
      { url: 'https://picsum.photos/600/800?random=13', size: 'half', caption: 'Color palette development' },
      { url: 'https://picsum.photos/1200/600?random=14', size: 'full' },
      { url: 'https://picsum.photos/800/600?random=15', size: 'two-thirds' },
      { url: 'https://picsum.photos/400/600?random=16', size: 'third', caption: 'Mobile app interface' },
      { url: 'https://picsum.photos/1200/900?random=17', size: 'full', caption: 'Website homepage hero section' },
    ],
    year: '2024',
    services: ['Brand Identity', 'Web Design', 'Art Direction'],
    technologies: ['Next.js', 'Framer Motion', 'Figma'],
    websiteUrl: 'https://hardtokill.com'
  },
  {
    id: 'combat',
    title: 'Combat',
    subtitle: 'E-commerce Platform',
    headerText: 'Precision Meets Performance.',
    description: 'A sophisticated e-commerce platform for premium combat sports equipment.',
    introText: 'Combat represents the intersection of brutal sport and refined design. This e-commerce platform was built to showcase premium martial arts equipment with the respect and attention it deserves. Every detail from product photography to checkout flow was designed to feel as precise and intentional as the training these products enable.',
    coverImage: 'https://picsum.photos/1200/800?random=2',
    images: [
      { url: 'https://picsum.photos/1200/800?random=21', size: 'full', caption: 'Homepage featuring seasonal collection' },
      { url: 'https://picsum.photos/800/1000?random=22', size: 'half' },
      { url: 'https://picsum.photos/800/1000?random=23', size: 'half' },
      { url: 'https://picsum.photos/400/600?random=24', size: 'third' },
      { url: 'https://picsum.photos/400/600?random=25', size: 'third', caption: 'Product detail view' },
      { url: 'https://picsum.photos/400/600?random=26', size: 'third' },
      { url: 'https://picsum.photos/1200/700?random=27', size: 'full' },
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
