import InlineLink from "../components/inline-link";
import ProjectStrip from "../components/project-strip";
import { getFeatured } from "../lib/content";

// PROTOTYPE — nothing links here. The strip homepage: same statement,
// but each project is a caption line over a full-width row of curated
// assets, so the glance shows the range instead of one image. If this
// wins it replaces app/page.tsx wholesale.
export default function HomeStrip() {
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
