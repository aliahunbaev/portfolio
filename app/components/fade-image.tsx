"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

/* An Image that fades up once its pixels arrive, so frames fill in
   softly instead of popping. The parent supplies the plate colour. */
export default function FadeImage({
  className = "",
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  // If the file was already loaded before hydration (a cached image on a
  // fast return visit), onLoad never fires — check on mount too.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <Image
      {...props}
      ref={ref}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
