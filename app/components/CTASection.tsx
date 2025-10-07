'use client';

import CalEmbed from './CalEmbed';

export default function CTASection() {
  return (
    <section className="px-4 pt-16 md:pt-24 pb-4">
      {/* Cal Embed - Full bleed on mobile, contained on desktop */}
      <div className="w-screen -ml-4 md:w-full md:ml-0">
        <CalEmbed />
      </div>
    </section>
  );
}
