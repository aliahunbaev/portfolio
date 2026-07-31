import type { Metadata } from "next";
import ProjectShell, {
  ProjectText,
  ProjectFigure,
} from "@/components/ProjectShell";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Beau Flâneur",
  description: "A wandering, dressed well.",
};

export default function BeauFlaneur() {
  return (
    <ProjectShell
      title="Beau Flâneur"
      year="2026"
      summary="A wandering, dressed well."
      hero={{
        label: "Beau Flâneur — hero",
        image: work.find((w) => w.href === "/beau-flaneur")?.image,
      }}
    >
      <ProjectText>
        <p>Stub. Placeholder copy for Beau Flâneur — to be written.</p>
      </ProjectText>

      <ProjectFigure label="Beau Flâneur" ratio="3 / 2" />
    </ProjectShell>
  );
}
