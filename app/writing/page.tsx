import Link from "next/link";
import { essays, type Essay } from "../lib/writing";

export const metadata = { title: "Writing — Ali Ahunbáev" };

function year(essay: Essay) {
  return essay.date.split(" ").pop() ?? "";
}

// Group by year, newest first, preserving the newest-first essay order.
const groups = essays.reduce<[string, Essay[]][]>((acc, essay) => {
  const y = year(essay);
  const last = acc[acc.length - 1];
  if (last && last[0] === y) last[1].push(essay);
  else acc.push([y, [essay]]);
  return acc;
}, []);

export default function Writing() {
  return (
    <main className="px-gutter pb-24 pt-30">
      <div className="flex flex-col gap-16">
        {groups.map(([y, list]) => (
          <section key={y} className="md:grid md:grid-cols-12 md:gap-x-gutter">
            <p className="text-body max-md:pb-6 md:col-span-2">{y}</p>
            <div className="flex flex-col gap-8 md:col-span-8 md:col-start-3">
              {list.map((essay) => (
                <Link
                  key={essay.slug}
                  href={`/writing/${essay.slug}`}
                  className="text-title hover:text-neutral-400"
                >
                  <span className="block font-medium">{essay.title}</span>
                  {essay.subtitle && (
                    <span className="block pt-1">{essay.subtitle}</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
