import Image from "next/image";
import data from "./about-data.json";
import combat from "../../public/about/combat.png";
import youtube from "../../public/about/youtube.jpg";
import playfighter from "../../public/about/playfighter.png";

// PREVIEW — nothing links here. If this becomes the About, it replaces
// Information's body. Every word below is Ali's, recovered verbatim from
// ali.ahunbaev.com (the site-v2 one-pager).

const cardImages = {
  Combat: combat,
  YouTube: youtube,
  Playfighter: playfighter,
} as const;

const utilities: [string, string][] = [
  ["alizahunbaev@gmail.com", "mailto:alizahunbaev@gmail.com"],
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Substack", "https://playfighter.substack.com"],
  ["LinkedIn", "https://linkedin.com/in/aliahunbaev"],
  ["Resume", "/Ali_Ahunbaev_CV.pdf"],
];

/** *asterisk* spans as italics, newlines as breaks. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line.split(/(\*[^*\n]+\*)/g).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
              <em key={j}>{part.slice(1, -1)}</em>
            ) : (
              <span key={j}>{part}</span>
            ),
          )}
        </span>
      ))}
    </>
  );
}

export default function AboutPreview() {
  return (
    <main className="px-gutter pb-24 pt-30 text-[16px] leading-[1.6]">
      <div className="mx-auto w-full max-w-[26rem]">
        {/* The photo slot — swap in a real one. */}
        <div className="mx-auto w-40">
          <div className="aspect-[4/5] w-full bg-black/[0.04]" />
        </div>

        <div className="space-y-[1.4em] pt-10">
          <p>
            I&apos;m Ali — an artist and product designer in New York, founder
            and director of Combat Créatif.
          </p>
          <p>
            I spend most of my time working to create beautiful things. I find
            this pursuit difficult, fulfilling, and wildly fun.
          </p>
          <p>
            The rest of my attention is divided between the gym, shawarma,
            books, movies, and women.
          </p>
        </div>

        {/* The living projects, card-fashion — the one-pager's own move. */}
        <div className="flex flex-col gap-3 pt-12">
          {data.links.map((link: { title: string; description: string; href: string }) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-black/10 p-3 hover:bg-black/[0.03]"
            >
              <span className="relative block size-14 shrink-0 overflow-hidden">
                <Image
                  src={cardImages[link.title as keyof typeof cardImages]}
                  alt={link.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block font-medium">{link.title}</span>
                <span className="block text-body text-neutral-500">
                  {link.description}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* His own words, whole. */}
        {data.sections.map((section: { title: string; paragraphs: string[] }) => (
          <section key={section.title} className="pt-16">
            <h2 className="pb-6 font-medium">{section.title}</h2>
            <div className="space-y-[1.4em]">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>
                  <Rich text={paragraph} />
                </p>
              ))}
            </div>
          </section>
        ))}

        <div className="flex flex-col gap-2 pt-16 text-body">
          {utilities.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener"
              className="w-fit font-medium hover:text-neutral-400"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
