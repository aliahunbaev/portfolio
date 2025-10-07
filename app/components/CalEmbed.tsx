'use client';

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "intro" });
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#1e3a5f",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <div 
      className="w-full px-4 xl:px-60 lg:px-8 py-28 md:py-32 lg:py-24 rounded-none lg:rounded-2xl"
      style={{
        background: '#1e3a5f',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: 'center center'
      }}
    >
      <div className="text-center mb-8 md:mb-24 leading-tight">
        <h2 
          className="text-3xl md:text-4xl text-white font-medium tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          Get in touch today.
        </h2>
        <p 
          className="text-3xl md:text-4xl text-white font-medium tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          Booking for Q4 2025.
        </p>
      </div>
      <Cal
        namespace="intro"
        calLink="ahunbaev/intro"
        style={{ width: "100%", height: "auto" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
