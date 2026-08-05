import WorkIndex from "../components/work-index";
import { getWorks } from "../lib/content";

export default function IndexPage() {
  return (
    <main className="px-gutter pb-24 pt-30">
      <WorkIndex works={getWorks()} />
    </main>
  );
}
