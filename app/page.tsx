import InlineLink from "./components/inline-link";
import ProjectStrip from "./components/project-strip";
import { getFeatured } from "./lib/content";

// Width of the intro blurb on desktop. Change this one number to taste:
// bigger is wider and fewer lines. The current text needs about 61rem to
// sit in three lines; 51rem gives four. The h1 also uses text-balance,
// so the lines come out even instead of leaving a short last line.
// The cap only applies from the md breakpoint up; phones run full width.
const BLURB_MAX_WIDTH = "65rem";

// The homepage statement, then each project as a caption band over a
// full-width strip of curated assets (homeRow in the frontmatter) —
// the glance shows the range, the case study the depth.
export default function Home() {
  return (
    <main className="px-gutter pb-gutter max-md:pb-16">
      <div className="pt-30 md:grid md:grid-cols-12 md:gap-x-gutter">
        <h1
          className="text-title text-balance font-medium leading-[1.1] md:col-span-12 md:max-w-(--blurb)"
          style={{ "--blurb": BLURB_MAX_WIDTH } as React.CSSProperties}
        >
          Ali Ahunbáev is an artist and product designer, creative director
          at <InlineLink href="https://instagram.com/vercinyc">Verci</InlineLink>, and
          founder of{" "}
          <InlineLink href="https://instagram.com/combatcreatif">Combat Créatif</InlineLink>.
          Currently on leave from New York University, focused on doing
          great work and connecting with brilliant people. His focus is on a
          mix of philosophy and beautiful utility.
        </h1>
      </div>
      <div className="flex flex-col gap-40 pt-40 max-md:gap-24 max-md:pt-24">
        {getFeatured().map((project, i) => (
          <ProjectStrip key={i} project={project} />
        ))}
      </div>
    </main>
  );
}
