import type { Metadata } from "next";
import ProjectShell, {
  ProjectSection,
  ProjectText,
  ProjectFigure,
} from "@/components/ProjectShell";

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
      chapters={CHAPTERS}
    >
      <ProjectSection id="introduction">
        <ProjectFigure label="Marble — hero" ratio="16 / 9" />
        <ProjectText>
          <p>
            Placeholder body. Marble is a training journal — a place to record
            the work, plainly and beautifully. This page ships partially real;
            the sections below alternate text and image the way the finished
            page will.
          </p>
          <p>
            The measure is comfortable, the voice is the sans utility face,
            and the chapters in the left margin track where you are as you
            read.
          </p>
        </ProjectText>
      </ProjectSection>

      <ProjectSection id="the-journal">
        <ProjectFigure label="Marble — the journal" ratio="4 / 3" />
        <ProjectText>
          <p>
            Placeholder body. A second section, to prove the alternation reads
            top to bottom. Replace with the real story: what it is, why it
            exists, how it is made.
          </p>
        </ProjectText>
      </ProjectSection>

      <ProjectSection id="details">
        <ProjectFigure label="Marble — detail" ratio="3 / 2" />
        <ProjectText>
          <p>
            Placeholder body. A closing section for craft details — the
            typography, the materials, the small decisions.
          </p>
        </ProjectText>
      </ProjectSection>
    </ProjectShell>
  );
}
