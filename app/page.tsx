import ProjectRow from "./components/project-row";
import { projects } from "./lib/projects";

// Lands straight into the work — the bio lives on Information. First
// ink (row meta + image top) sits at the site-wide 64px line.
export default function Home() {
  return (
    <main className="px-gutter pb-24">
      <div className="flex flex-col gap-gutter pt-16 max-md:gap-16">
        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} />
        ))}
      </div>
    </main>
  );
}
