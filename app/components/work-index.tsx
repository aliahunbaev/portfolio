"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "../lib/projects";

type SortKey = "date" | "title" | "category";

const sorts: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "title", label: "Project" },
  { key: "category", label: "Type" },
];

function compare(a: Project, b: Project, key: SortKey) {
  if (key === "date") {
    return (new Date(a.date).getTime() || 0) - (new Date(b.date).getTime() || 0);
  }
  return a[key].localeCompare(b[key]);
}

/*
 * Text-first archive: a typographic list of titles on the left, and a fixed
 * preview slot on the right (cols 8-12) where the hovered project's cover,
 * date/type, and description appear. The preview persists until another row
 * is hovered so the slot never sits empty.
 */
export default function WorkIndex() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [descending, setDescending] = useState(true);
  const [active, setActive] = useState<Project>(projects[0]);

  const sorted = [...projects].sort(
    (a, b) => compare(a, b, sortKey) * (descending ? -1 : 1),
  );

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setDescending(!descending);
    } else {
      setSortKey(key);
      setDescending(key === "date");
    }
  }

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
      <div className="md:col-span-7">
        <div className="flex gap-gutter pb-8 text-sm leading-none">
          {sorts.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleSort(key)}
              className={`font-medium ${
                sortKey === key ? "" : "text-neutral-400 hover:text-black"
              }`}
            >
              {label}
              {sortKey === key ? (descending ? " ↓" : " ↑") : ""}
            </button>
          ))}
        </div>
        <ul className="flex flex-col gap-2">
          {sorted.map((project) => (
            <li key={`${project.title}-${project.image}`}>
              <a
                href="#"
                onMouseEnter={() => setActive(project)}
                className="group flex items-baseline justify-between gap-gutter"
              >
                <span className="text-2xl font-medium leading-none group-hover:text-neutral-400 max-md:text-xl">
                  {project.title}
                </span>
                <span className="text-sm leading-none text-neutral-400 md:hidden">
                  {project.date}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-md:hidden md:col-span-5 md:col-start-8">
        <div className="sticky top-12">
          <div className="relative aspect-[1.85/1] w-full overflow-hidden">
            <Image
              key={active.image}
              src={active.image}
              alt={active.title}
              fill
              sizes="(max-width: 768px) 0px, 42vw"
              className="object-cover"
              style={{ objectPosition: active.objectPosition }}
            />
          </div>
          <div className="grid grid-cols-5 gap-x-gutter pt-4 text-sm leading-none">
            <p className="col-span-2 font-medium">{active.date}</p>
            <p className="col-span-3 font-medium">{active.category}</p>
            <p className="col-span-3 col-start-3 pt-4">{active.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
