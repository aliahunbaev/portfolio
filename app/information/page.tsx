import Link from "next/link";

export const metadata = { title: "Information — Ali Ahunbáev" };

// Renell-minimal: the statement and two handles. A real portrait can sit
// bottom-right later; everything else lives at /links.
export default function Information() {
  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="text-title font-medium max-md:leading-tight md:col-span-8">
          <p>
            Ali Ahunbáev is an artist and product designer in New York —
            founder and director of Combat Créatif, currently building Marble,
            hosting The Art Movement, and dressing the wanderers through Beau
            Flâneur.
          </p>
          <p className="pt-8">
            He is on leave from New York University, focused on doing great
            work and connecting with brilliant people, and writes weekly at
            PLAYFIGHTER.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-16 text-title">
        <Link
          href="https://instagram.com/alizahunbaev"
          target="_blank"
          rel="noopener"
          className="w-fit hover:text-neutral-400"
        >
          @alizahunbaev
        </Link>
        <Link
          href="https://instagram.com/combat.creatif"
          target="_blank"
          rel="noopener"
          className="w-fit hover:text-neutral-400"
        >
          @combat.creatif
        </Link>
      </div>
    </main>
  );
}
