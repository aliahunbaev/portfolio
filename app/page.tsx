import ProjectRow from "./components/project-row";
import { projects } from "./lib/projects";

export default function Home() {
  return (
    <main className="px-gutter pb-24">
      {/* Intro caps at 8 of 12 columns for a readable line length. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:gap-x-gutter">
        <h1 className="text-title font-medium max-md:leading-tight md:col-span-8">
          Ali Ahunbáev is an artist, product designer, founder and director of{" "}
          <a
            href="https://combatcreatif.com"
            target="_blank"
            rel="noopener"
            className="whitespace-nowrap rounded-[0.25em] bg-black/[0.07] px-[0.22em] py-[0.1em] font-fraktion text-[0.88em] uppercase tracking-wide hover:bg-[#B7C29A]"
          >
            Combat Créatif
          </a>. Currently on leave from New York University, focused on doing great
          work and connecting with brilliant people. His focus is on a mix of
          philosophy and beautiful utility.
        </h1>
      </div>
      <div className="flex flex-col gap-gutter pt-24 max-md:gap-16 max-md:pt-16">
        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} />
        ))}
      </div>
    </main>
  );
}
