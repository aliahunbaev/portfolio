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
      className="w-full px-8 pt-8 pb-4 rounded-2xl"
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
      <Cal
        namespace="intro"
        calLink="ahunbaev/intro"
        style={{ width: "100%", height: "700px" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
