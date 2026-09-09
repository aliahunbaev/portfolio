import SketchGrid from "../components/sketch-grid";

export const metadata = { title: "Sketches" };

export default function Sketches() {
  return (
    <main className="px-gutter pb-gutter pt-30 max-md:pb-16">
      <SketchGrid />
    </main>
  );
}
