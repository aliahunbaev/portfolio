'use client';

import CalEmbed from './CalEmbed';

export default function CTASection() {
  return (
    <section className="pt-16 md:pt-24 lg:px-4">
      {/* Cal Embed - Full bleed on mobile/tablet, contained on desktop */}
      <CalEmbed />
    </section>
  );
}
