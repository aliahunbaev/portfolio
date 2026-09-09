import { essays } from "../../lib/all-writing";
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from "../../lib/og";

export const alt = "Essay by Ali Ahunbáev";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  const [month, , year] = (essay?.date ?? "").split(" ");
  return ogCard({
    label: "Ali Ahunbáev",
    aside: essay ? `${month} ${year}` : undefined,
    title: essay?.title ?? "Writing",
    subtitle: essay?.subtitle,
  });
}
