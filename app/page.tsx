import ProjectRow from "./components/project-row";
import { projects } from "./lib/projects";

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
