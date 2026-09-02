import data from "../about/about-data.json";

// OPTION C — contact-first: the page opens as a compiled contact sheet
// (photo, intro, every way to reach you), and the story runs beneath in
// the centered reading register.

const reach: [string, string, string][] = [
  ["Email", "alizahunbaev@gmail.com", "mailto:alizahunbaev@gmail.com"],
  ["Instagram", "@alizahunbaev", "https://instagram.com/alizahunbaev"],
  ["Studio", "@combatcreatif", "https://instagram.com/combatcreatif"],
  ["YouTube", "@playfighter", "https://youtube.com/@playfighter"],
  ["Substack", "playfighter", "https://playfighter.substack.com"],
  ["LinkedIn", "aliahunbaev", "https://linkedin.com/in/aliahunbaev"],
  ["Resume", "PDF", "/Ali_Ahunbaev_CV.pdf"],
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

export default function AboutContact() {
  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      {/* The contact sheet: who, where, how to reach. */}
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="md:col-span-2">
          <div className="aspect-[4/5] w-full max-w-36 bg-black/[0.04]" />
        </div>
        <div className="max-md:pt-8 md:col-span-4 md:col-start-4">
          <p className="leading-[1.5]">
            I&apos;m Ali — an artist and product designer in New York, founder
            and director of Combat Créatif. I spend most of my time working to
            create beautiful things. I find this pursuit difficult,
            fulfilling, and wildly fun.
          </p>
        </div>
        <div className="max-md:pt-8 md:col-span-4 md:col-start-9">
          <div className="grid grid-cols-2 gap-y-2">
            {reach.map(([label, value, href]) => (
              <div key={href} className="col-span-2 grid grid-cols-subgrid">
                <p>{label}</p>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener"
                  className="w-fit font-medium hover:text-neutral-400"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* The story, centered, below. */}
      <div className="mx-auto w-full max-w-[26rem] pt-24 text-[16px] leading-[1.6]">
        {data.sections.map((section: { title: string; paragraphs: string[] }, si: number) => (
          <section key={section.title} className={si === 0 ? "" : "pt-16"}>
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
      </div>
    </main>
  );
}
