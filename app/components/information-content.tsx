import data from "../lib/about-data.json";

/*
 * Information is the story — the creativity-lens history, first person,
 * in the reading register. Contact lives in the site footer and only
 * there; this page carries no links.
 *
 * Structure: a sticky photo rail on the left, the narrative on the
 * right at 16px — the one-pager sections as the skeleton, photo rows
 * punctuating the reading. Every gray plate is a placeholder for a
 * real photograph; the section text is Ali's one-pager verbatim,
 * standing in until the longer history is written.
 */

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

/* A pair of photo plates in the row grammar — placeholders until the
   real photographs land. */
function PhotoRow() {
  return (
    <div className="flex items-start gap-x-gutter pt-16">
      <div
        className="bg-black/[0.04]"
        style={{ flexGrow: 4 / 5, flexBasis: 0, aspectRatio: "4 / 5" }}
      />
      <div
        className="bg-black/[0.04]"
        style={{ flexGrow: 3 / 2, flexBasis: 0, aspectRatio: "3 / 2" }}
      />
    </div>
  );
}

export default function InformationContent() {
  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        {/* The portrait, pinned while the story scrolls. */}
        <aside className="md:sticky md:top-30 md:col-span-3">
          <div className="aspect-[4/5] w-40 bg-black/[0.04]" />
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
          </div>
          {data.sections.map(
            (section: { title: string; paragraphs: string[] }, si: number) => (
              <section key={section.title}>
                <h2 className="pt-16 pb-6 text-[16px] font-medium">
                  {section.title}
                </h2>
                <div className="space-y-[1.4em] text-[16px] leading-[1.6]">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>
                      <Rich text={paragraph} />
                    </p>
                  ))}
                </div>
                {/* Photographs breathe between chapters. */}
                {si === 0 && <PhotoRow />}
                {si === 2 && <PhotoRow />}
              </section>
            ),
          )}
        </article>
      </div>
    </main>
  );
}
