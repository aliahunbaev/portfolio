import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from "./lib/og";

export const alt = "Ali Ahunbáev";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "ahunbaev.com",
    title: "Ali Ahunbáev",
    subtitle: "Artist and Product Designer, New York.",
  });
}
