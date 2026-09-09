/* Inline mentions of Combat Créatif, Playfighter, and the like, inside
   the bio and the homepage statement. They read as part of the sentence
   and only reveal themselves on hover, going gray like every other link
   on the site. */

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function InlineLink({ href, children }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="hover:text-neutral-400"
    >
      {children}
    </a>
  );
}

/* The earlier treatment: a Fraktion wordmark pill that lifts the name out
   of the sentence. Not in use, kept here in case it comes back. */
export function BrandPill({ href, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="whitespace-nowrap rounded-[0.25em] bg-black/[0.07] px-[0.15em] font-fraktion text-[0.92em] uppercase hover:bg-[#B7C29A]"
    >
      {children}
    </a>
  );
}
