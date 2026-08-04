import Link from "next/link";

// Bio-link page at ahunbaev.com/peace — mobile-first, its audience
// arrives from a social bio.
const links: [string, string][] = [
  ["Portfolio", "/"],
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Combat Créatif", "https://combatcreatif.com"],
  ["PLAYFIGHTER", "https://playfighter.substack.com"],
  ["YouTube", "https://youtube.com/@playfighter"],
  ["Email", "mailto:alizahunbaev@gmail.com"],
];

export default function Peace() {
  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      <p className="font-medium">Ali Ahunbáev</p>
      <p className="pt-1">Artist &amp; Product Designer, New York.</p>
      <div className="flex flex-col gap-2 pt-12 text-title font-medium">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener"
            className="w-fit py-1 hover:text-neutral-400"
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
