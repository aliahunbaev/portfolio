import ProjectRow, { type Project } from "./components/project-row";

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

export default function Home() {
  return (
    <main className="px-gutter pb-24">
      <h1 className="pt-30 text-2xl font-medium leading-none max-md:text-xl max-md:leading-tight">
        Ali Ahunbáev is an artist, product designer, founder and director of{" "}
        <span className="underline decoration-[#dfdfdf] decoration-2 underline-offset-4">
          Combat Créatif
        </span>
        . Currently on leave from New York University, focused on doing great
        work and connecting with brilliant people. His focus is on a mix of
        philosophy and beautiful utility.
      </h1>
      <div className="flex flex-col gap-gutter pt-24 max-md:gap-16 max-md:pt-16">
        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} />
        ))}
      </div>
    </main>
  );
}
