import type { Metadata } from "next";
import ProjectShell, {
  ProjectSection,
  ProjectText,
  ProjectFigure,
} from "@/components/ProjectShell";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Marble",
  description: "An attempt at making the most beautiful training journal in existence.",
};

const CHAPTERS = [
  { id: "introduction", label: "Introduction" },
  { id: "the-journal", label: "The journal" },
  { id: "details", label: "Details" },
];

export default function Marble() {
  return (
    <ProjectShell
      title="Marble"
      year="2026"
      summary="An attempt at making the most beautiful training journal in existence."
      hero={{
        label: "Marble — hero",
        image: work.find((w) => w.href === "/marble")?.image,
      }}
      chapters={CHAPTERS}
    >
      <ProjectSection id="introduction" heading="Introduction">
        <ProjectText>
          <p>
            Placeholder body. Marble is a training journal — a place to record
            the work, plainly and beautifully. This page ships partially real;
            the sections below alternate text and image the way the finished
            page will.
          </p>
          <p>
            The measure is comfortable, the voice is the sans utility face,
            and the chapters in the rail track where you are as you read.
          </p>
        </ProjectText>
        <ProjectFigure label="Marble — overview" ratio="16 / 9" />
      </ProjectSection>

      <ProjectSection id="the-journal" heading="The journal">
        <ProjectText>
          <p>
            Placeholder body. A second section, to prove the alternation reads
            top to bottom. Replace with the real story: what it is, why it
            exists, how it is made.
          </p>
        </ProjectText>
        <ProjectFigure label="Marble — the journal" ratio="4 / 3" />
      </ProjectSection>

      <ProjectSection id="details" heading="Details">
        <ProjectText>
          <p>
            Placeholder body. A closing section for craft details — the
            typography, the materials, the small decisions.
          </p>
        </ProjectText>
        <ProjectFigure label="Marble — detail" ratio="3 / 2" />
      </ProjectSection>
    </ProjectShell>
  );
}
