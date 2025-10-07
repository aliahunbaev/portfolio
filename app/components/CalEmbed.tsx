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
      className="w-full px-4 xl:px-60 md:px-8 pt-12 md:pt-20 pb-8 md:pb-10 md:rounded-2xl"
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
      <h2 
        className="text-3xl md:text-4xl text-white font-medium mb-12 tracking-tight text-center"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      >
        Get in touch today.
      </h2>
      <Cal
        namespace="intro"
        calLink="ahunbaev/intro"
        style={{ width: "100%", height: "auto" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
