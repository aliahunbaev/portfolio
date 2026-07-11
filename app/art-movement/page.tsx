import type { Metadata } from "next";
import ProjectShell, {
  ProjectText,
  ProjectFigure,
} from "@/components/ProjectShell";

export const metadata: Metadata = {
  title: "The Art Movement",
  description: "A gathering, and an argument for making things seriously.",
};

export default function ArtMovement() {
  return (
    <ProjectShell
      title="The Art Movement"
      year="2026"
      summary="A gathering, and an argument for making things seriously."
    >
      <ProjectText>
        <p>Stub. Placeholder copy for The Art Movement — to be written.</p>
      </ProjectText>

      <ProjectFigure label="The Art Movement" ratio="16 / 9" />
    </ProjectShell>
  );
}
