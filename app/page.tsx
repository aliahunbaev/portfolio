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
        {/* BLURB WIDTH: edit the class list on the next line.
            md:col-span-8  = 8 of 12 columns (try 7 or 9), or add an exact
            cap such as md:max-w-[980px]. text-balance evens the lines. */}
        <h1 className="text-title text-pretty font-medium leading-[1.1] md:col-span-10 md:max-w-[880px]">
          Ali Ahunbáev is an artist and product designer, creative director
          at <InlineLink href="https://instagram.com/vercinyc">Verci</InlineLink> and
          founder of{" "}
          <InlineLink href="https://instagram.com/combatcreatif">Combat&nbsp;Créatif</InlineLink>.
          Currently on leave from New York University, he makes products,
          films, and events that mix philosophy with beautiful utility.
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
