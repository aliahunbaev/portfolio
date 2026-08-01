import Link from "next/link";

const links = [
  { label: "Index", href: "/" },
  { label: "Writing", href: "/writing" },
  { label: "Sketches", href: "/sketches" },
  { label: "Information", href: "/information" },
];

export default function SiteNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-white/90 px-gutter py-1 text-sm font-medium leading-none">
      <Link href="/">Ali Ahunbáev</Link>
      {links.map(({ label, href }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
