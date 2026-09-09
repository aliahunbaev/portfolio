import InlineLink from "./components/inline-link";
import ProjectStrip from "./components/project-strip";
import { getFeatured } from "./lib/content";

// The homepage statement, then each project as a caption band over a
// full-width strip of curated assets (homeRow in the frontmatter) —
// the glance shows the range, the case study the depth.
export default function Home() {
  return (
    <main className="px-gutter pb-gutter max-md:pb-16">
      <div className="pt-30 md:grid md:grid-cols-12 md:gap-x-gutter">
        <h1 className="text-title font-medium leading-[1.1] md:col-span-8">
          Ali Ahunbáev is an artist, product designer, founder and director of{" "}
          <InlineLink href="https://combatcreatif.com">Combat Créatif</InlineLink>.
          Currently on leave from New York University, focused on doing
          great work and connecting with brilliant people. His focus is on a
          mix of philosophy and beautiful utility.
        </h1>
      </div>
      <div className="flex flex-col gap-40 pt-40 max-md:gap-16 max-md:pt-16">
        {getFeatured().map((project, i) => (
          <ProjectStrip key={i} project={project} />
        ))}
      </div>
    </main>
  );
}
