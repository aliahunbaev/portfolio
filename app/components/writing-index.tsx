import Link from "next/link";
import { pieces } from "../lib/pieces";

/* A quiet list in the middle of the page: title in medium, subtitle
   receded beneath, generous air between entries. Clicking simply goes
   to the piece — reading should be easy. */
export default function WritingIndex() {
  return (
    <div className="text-body md:grid md:grid-cols-12 md:gap-x-gutter">
      <ul className="flex flex-col gap-y-10 md:col-span-5 md:col-start-4">
        {pieces.map((essay) => (
          <li key={essay.slug}>
            <Link href={`/writing/${essay.slug}`} className="group block">
              <span className="block font-medium group-hover:text-neutral-400">
                {essay.title}
              </span>
              {essay.subtitle && (
                <span className="block pt-1 leading-[1.4] text-neutral-400">
                  {essay.subtitle}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
