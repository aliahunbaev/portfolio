import Image from "next/image";

type Project = {
  date: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Vertical object-position matching the crop framing in the design. */
  objectPosition: string;
};

const projects: Project[] = [
  {
    date: "July 2026",
    title: "Marble",
    category: "iOS App",
    description:
      "Building the most beautiful training app in existence, mixing sport, philosophy, and design.",
    image: "/images/marble-book.png",
    objectPosition: "50% 50%",
  },
  {
    date: "May 2026",
    title: "The Art Movement",
    category: "Community Gathering",
    description:
      "Concepting, organizing, and hosting an art exhibition and rooftop party for dope artists in New York.",
    image: "/images/art-movement-painting.png",
    objectPosition: "50% 54%",
  },
  {
    date: "August 2025",
    title: "Beau Flâneur",
    category: "Fashion Brand",
    description:
      "The fashion design project centered around wandering, existentialism, and French - Romantic visuals.",
    image: "/images/beau-flaneur-trumpet.png",
    objectPosition: "50% 55%",
  },
  {
    date: "July 2026",
    title: "Marble",
    category: "iOS App",
    description:
      "Building the most beautiful training app in existence, mixing sport, philosophy, and design.",
    image: "/images/marble-jungle.png",
    objectPosition: "50% 50%",
  },
  {
    date: "May 2026",
    title: "The Art Movement",
    category: "Community Gathering",
    description:
      "Concepting, organizing, and hosting an art exhibition and rooftop party for dope artists in New York.",
    image: "/images/art-movement-panther.png",
    objectPosition: "50% 84%",
  },
  {
    date: "August 2025",
    title: "Beau Flâneur",
    category: "Fashion Brand",
    description:
      "The fashion design project centered around wandering, existentialism, and French - Romantic visuals.",
    image: "/images/beau-flaneur-lightbox.png",
    objectPosition: "50% 0%",
  },
];

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="md:flex">
      {/* Meta column: starts 48px above the image and stays sticky while the row scrolls. */}
      <div className="md:-mt-12 md:w-[31.3%] md:shrink-0 md:self-stretch">
        <div className="text-[14px] leading-none max-md:pb-5 md:sticky md:top-0 md:pt-[51px]">
          <div className="grid grid-cols-[216px_1fr] gap-y-4 max-md:grid-cols-[140px_1fr]">
            <p className="font-medium">{project.date}</p>
            <p className="font-medium">{project.title}</p>
            <p>{project.category}</p>
            <p className="max-w-[245px]">{project.description}</p>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="relative block aspect-[1011/544] overflow-hidden md:flex-1"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 69vw"
          className="object-cover"
          style={{ objectPosition: project.objectPosition }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium leading-none text-white mix-blend-exclusion">
          View Project
        </span>
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <main className="pb-24">
      <h1 className="px-4 pt-[120px] text-[24px] font-medium leading-none max-md:text-[20px] max-md:leading-tight">
        Ali Ahunbáev is an artist, product designer, founder and director of{" "}
        <span className="underline decoration-[#dfdfdf] decoration-2 underline-offset-4">
          Combat Créatif
        </span>
        . Currently on leave from New York University, focused on doing great
        work and connecting with brilliant people. His focus is on a mix of
        philosophy and beautiful utility.
      </h1>
      <div className="flex flex-col gap-[25px] px-[23px] pt-[103px] max-md:gap-16 max-md:px-4 max-md:pt-16">
        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} />
        ))}
      </div>
    </main>
  );
}
