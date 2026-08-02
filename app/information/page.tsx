import Link from "next/link";

export const metadata = { title: "Information — Ali Ahunbáev" };

const contacts: [string, string, string][] = [
  ["Contact", "alizahunbaev@gmail.com", "mailto:alizahunbaev@gmail.com"],
  ["Instagram", "@alizahunbaev", "https://instagram.com/alizahunbaev"],
  ["Substack", "playfighter", "https://playfighter.substack.com"],
  ["YouTube", "@playfighter", "https://youtube.com/@playfighter"],
  ["Studio", "Combat Créatif", "https://combatcreatif.com"],
  ["Studio IG", "@combat.creatif", "https://instagram.com/combat.creatif"],
];

// Bio is placeholder copy in the site's voice — rewrite freely.
const bio = [
  "Ali Ahunbáev is an artist and product designer working between New York and the internet. He is the founder and director of Combat Créatif, a studio built on the belief that philosophy and beautiful utility belong in the same object.",
  "His current work spans Marble, a training app that treats the body the way philosophy treats the mind; The Art Movement, a series of exhibitions and rooftop gatherings for artists in New York; and Beau Flâneur, a fashion project about wandering. He is currently on leave from New York University.",
  "He writes weekly at PLAYFIGHTER, and is always glad to hear from brilliant people — the fastest way to reach him is Instagram.",
];

export default function Information() {
  return (
    <main className="px-gutter pb-24 text-body">
      {/* Same anatomy as a work page: sticky rail 1-4, prose 5-9. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        <aside className="grid grid-cols-4 content-start gap-x-gutter gap-y-4 max-md:grid-cols-3 md:sticky md:top-30 md:col-span-4">
          {contacts.map(([label, value, href]) => (
            <div
              key={label}
              className="col-span-4 grid grid-cols-subgrid max-md:col-span-3"
            >
              <p className="col-span-2 max-md:col-span-1">{label}</p>
              <Link
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener"
                className="col-span-2 hover:text-neutral-400 max-md:col-span-2"
              >
                {value}
              </Link>
            </div>
          ))}
        </aside>
        <div className="max-md:pt-12 md:col-span-8">
          <div className="md:grid md:grid-cols-8 md:gap-x-gutter">
            <div className="space-y-[1.4em] leading-[1.5] md:col-span-5">
              {bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
