import type { Metadata } from "next";

export const metadata: Metadata = { title: "Library" };

/* Placeholder until the library is built: the films, records, books,
   and references that shaped the work, on walls. */
export default function LibraryPage() {
  return (
    <main className="min-h-screen px-gutter pt-30 pb-24 text-body">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="md:col-span-6">
          <h1 className="text-title font-medium leading-[1.1]">Library</h1>
          <p className="pt-4 leading-[1.5]">
            Everything I love, on walls. Films, records, books, and the
            references behind the work. Opening soon.
          </p>
        </div>
      </div>
    </main>
  );
}
