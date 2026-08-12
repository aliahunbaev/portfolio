import Image from "next/image";
import Link from "next/link";
import PreviewVideo from "./preview-video";
import { slugify, type Project } from "../lib/projects";

/*
 * Meta uses a 3-column grid: the wide (2-col) track holds title/description,
 * the narrow (1-col) track holds date/category.
 * Desktop: narrow track left (cols 1-4 of the page grid), image right.
 * Mobile: image first, then meta below with the wide track on the left and
 * date/category right-aligned on the right.
 */
export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="max-md:flex max-md:flex-col md:grid md:grid-cols-12 md:gap-x-gutter">
      {/* Starts 48px above the image on desktop and stays sticky while the
          row scrolls. */}
      <div className="max-md:order-2 md:col-span-4 md:-mt-12 md:self-stretch">
        <div className="grid grid-cols-3 gap-x-gutter gap-y-4 text-body max-md:pt-4 md:sticky md:top-0 md:pt-12">
          <p className="col-span-2 row-start-1 font-medium max-md:col-start-1 md:col-start-2">
            {project.title}
          </p>
          <p className="row-start-1 font-medium max-md:col-start-3 max-md:text-right md:col-start-1">
            {project.date}
          </p>
          <p className="col-span-2 row-start-2 max-md:col-start-1 md:col-start-2">
            {project.description}
          </p>
          <p className="row-start-2 max-md:col-start-3 max-md:text-right md:col-start-1">
            {project.category}
          </p>
        </div>
      </div>
      <Link
        href={`/work/${slugify(project.title)}`}
        data-cursor-label="View Project"
        className="relative block aspect-[1.85/1] cursor-none overflow-hidden max-md:order-1 md:col-span-8"
      >
        {project.previewVideo ? (
          // Silent looping preview — the moving version of a cover image,
          // same crop behaviour, no controls.
          <PreviewVideo
            src={project.previewVideo}
            poster={project.previewPoster}
            objectPosition={project.objectPosition}
          />
        ) : (
          <Image
            draggable={false}
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 67vw"
            className="object-cover"
            style={{ objectPosition: project.objectPosition }}
          />
        )}
      </Link>
    </article>
  );
}
