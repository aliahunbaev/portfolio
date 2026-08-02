"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { projects, type Project } from "../lib/projects";

type SortKey = "date" | "title" | "category";

const columns: { key: SortKey; label: string }[] = [
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

export default function WorkIndex() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [descending, setDescending] = useState(true);
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

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

  function movePreview(e: React.MouseEvent) {
    lastPos.current = { x: e.clientX, y: e.clientY };
    const preview = previewRef.current;
    if (!preview) return;
    preview.style.left = `${e.clientX}px`;
    preview.style.top = `${e.clientY}px`;
  }

  // Place the preview at the cursor the moment it appears, before the next
  // mousemove fires.
  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    preview.style.left = `${lastPos.current.x}px`;
    preview.style.top = `${lastPos.current.y}px`;
  }, [hovered]);

  return (
    <div onMouseMove={movePreview}>
      <div className="grid grid-cols-12 gap-x-gutter border-b border-black/10 pb-2 text-sm leading-none max-md:hidden">
        {columns.map(({ key, label }, i) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleSort(key)}
            className={`text-left font-medium ${
              i === 0 ? "col-span-2" : i === 1 ? "col-span-3" : "col-span-2"
            } ${sortKey === key ? "" : "text-neutral-400 hover:text-black"}`}
          >
            {label}
            {sortKey === key ? (descending ? " ↓" : " ↑") : ""}
          </button>
        ))}
        <p className="col-span-5 font-medium text-neutral-400">Description</p>
      </div>
      <ul>
        {sorted.map((project, i) => (
          <li key={`${project.title}-${project.image}`}>
            <a
              href="#"
              onMouseEnter={() => setHovered(project)}
              onMouseLeave={() => setHovered(null)}
              className="grid grid-cols-12 gap-x-gutter border-b border-black/10 py-2 text-sm leading-none max-md:grid-cols-3 max-md:gap-y-4 max-md:py-4"
            >
              <p className="max-md:col-start-3 max-md:row-start-1 max-md:text-right md:col-span-2">
                {project.date}
              </p>
              <p className="font-medium max-md:col-span-2 max-md:col-start-1 max-md:row-start-1 md:col-span-3">
                {project.title}
              </p>
              <p className="max-md:col-start-3 max-md:row-start-2 max-md:text-right md:col-span-2">
                {project.category}
              </p>
              <p className="max-md:col-span-2 max-md:col-start-1 max-md:row-start-2 md:col-span-5">
                {project.description}
              </p>
            </a>
          </li>
        ))}
      </ul>
      {/* Cursor-following image preview, same pattern as the View Project
          label: fixed to the viewport so scrolling doesn't drag it away. */}
      {hovered && (
        <div
          ref={previewRef}
          className="pointer-events-none fixed z-30 aspect-[1.85/1] w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-md:hidden"
        >
          <Image
            src={hovered.image}
            alt=""
            fill
            sizes="288px"
            className="object-cover"
            style={{ objectPosition: hovered.objectPosition }}
          />
        </div>
      )}
    </div>
  );
}
