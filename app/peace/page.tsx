import Link from "next/link";

export const metadata = { title: "Ali Ahunbáev" };

// Bio-link page at ahunbaev.com/peace — placeholder layout, to be
// designed properly later.
const links: [string, string][] = [
  ["Portfolio", "/"],
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Combat Créatif", "https://combatcreatif.com"],
  ["PLAYFIGHTER", "https://playfighter.substack.com"],
  ["YouTube", "https://youtube.com/@playfighter"],
  ["Email", "mailto:alizahunbaev@gmail.com"],
];

export default function Links() {
  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      <p>Ali Ahunbáev — artist and product designer, New York.</p>
      <div className="flex flex-col gap-2 pt-12 text-title font-medium">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            target={
              href.startsWith("http") ? "_blank" : undefined
            }
            rel="noopener"
            className="w-fit hover:text-neutral-400"
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
