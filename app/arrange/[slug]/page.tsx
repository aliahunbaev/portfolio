import { notFound } from "next/navigation";
import Arranger from "./arranger";

export default async function ArrangePage({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  return <Arranger slug={slug} />;
}
