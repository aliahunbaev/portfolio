import Link from "next/link";

export const metadata = { title: "Information — Ali Ahunbáev" };

const links: [string, string][] = [
  ["alizahunbaev@gmail.com", "mailto:alizahunbaev@gmail.com"],
  ["@alizahunbaev", "https://instagram.com/alizahunbaev"],
  ["PLAYFIGHTER", "https://playfighter.substack.com"],
  ["@playfighter", "https://youtube.com/@playfighter"],
  ["Combat Créatif", "https://combatcreatif.com"],
  ["@combat.creatif", "https://instagram.com/combat.creatif"],
];

// All copy below is placeholder in the site's voice — rewrite freely.
const background = [
  "Ali started college at fifteen, taking community college classes with zero bills, zero pressure, and an empty social circle — a comfortable life that made him miserable. During classes, in the car, and in the gym he listened to biographies that stretched his imagination far beyond his reality, and decided comfort was the wrong thing to optimize for.",
  "In August 2025 he moved to New York with a simple thesis: New York or nowhere. The first weeks were spent talking to strangers, walking the city, and writing about it — the beginning of PLAYFIGHTER, a weekly practice of thinking in public that has since grown past twenty essays.",
  "He enrolled at New York University and later took leave to go all in on the work: Marble, a training app built on the belief that the body deserves the same deliberate sculpting philosophy gives the mind; The Art Movement, exhibitions and rooftop gatherings for young artists in the city; and Beau Flâneur, a fashion project about wandering.",
  "Combat Créatif is the studio that holds it all together — a practice built on philosophy and beautiful utility, and on the conviction that pressure is a privilege.",
  "He is always glad to hear from brilliant people. The fastest way to reach him is Instagram; email works too.",
];

export default function Information() {
  return (
    <main className="px-gutter pb-24 pt-30">
      {/* Big bio + naked links up top; the long story lives below in the
          small reading column. */}
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="text-title font-medium max-md:leading-tight md:col-span-8">
          <p>
            Ali Ahunbáev is an artist and product designer in New York — founder
            and director of Combat Créatif, currently building Marble, hosting
            The Art Movement, and dressing the wanderers through Beau Flâneur.
          </p>
          <p className="pt-8">
            He is on leave from New York University, focused on doing great work
            and connecting with brilliant people, and writes weekly at
            PLAYFIGHTER.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-16 text-title">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener"
            className="w-fit hover:text-neutral-400"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="pt-24 md:grid md:grid-cols-12 md:gap-x-gutter">
        <p className="text-body max-md:pb-6 md:col-span-2">Background</p>
        <div className="space-y-[1.4em] text-body leading-[1.5] md:col-span-5 md:col-start-5">
          {background.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
