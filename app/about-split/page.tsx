import data from "../about/about-data.json";

// OPTION B — the split view: everything to reach you pinned on the left
// rail, the long bio scrolling on the right. Site anatomy at full
// commitment. On mobile the rail becomes the opening block.

const reach: [string, string][] = [
  ["alizahunbaev@gmail.com", "mailto:alizahunbaev@gmail.com"],
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Studio", "https://instagram.com/combatcreatif"],
  ["YouTube", "https://youtube.com/@playfighter"],
  ["Substack", "https://playfighter.substack.com"],
  ["LinkedIn", "https://linkedin.com/in/aliahunbaev"],
  ["Resume", "/Ali_Ahunbaev_CV.pdf"],
];

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

export default function AboutSplit() {
  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        <aside className="md:sticky md:top-30 md:col-span-3">
          <div className="aspect-[4/5] w-32 bg-black/[0.04]" />
          <div className="flex flex-col gap-y-2 pt-8 max-md:flex-row max-md:flex-wrap max-md:gap-x-6">
            {reach.map(([label, href]) => (
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
        </aside>
        <article className="max-md:pt-16 md:col-span-5 md:col-start-5">
          <div className="space-y-[1.4em] text-[16px] leading-[1.6]">
            <p>
              I&apos;m Ali — an artist and product designer in New York,
              founder and director of Combat Créatif.
            </p>
            <p>
              I spend most of my time working to create beautiful things. I
              find this pursuit difficult, fulfilling, and wildly fun.
            </p>
            <p>
              The rest of my attention is divided between the gym, shawarma,
              books, movies, and women.
            </p>
          </div>
          {data.sections.map((section: { title: string; paragraphs: string[] }) => (
            <section key={section.title} className="pt-16">
              <h2 className="pb-6 text-[16px] font-medium">{section.title}</h2>
              <div className="space-y-[1.4em] text-[16px] leading-[1.6]">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>
                    <Rich text={paragraph} />
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
