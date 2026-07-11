import type { Metadata } from "next";
import ProjectShell, {
  ProjectText,
  ProjectFigure,
} from "@/components/ProjectShell";

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
    >
      <ProjectText>
        <p>Stub. Placeholder copy for Beau Flâneur — to be written.</p>
      </ProjectText>

      <ProjectFigure label="Beau Flâneur" ratio="3 / 2" />
    </ProjectShell>
  );
}
