"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/* An Image that fades up once its pixels arrive, so frames fill in
   softly instead of popping. The parent supplies the plate colour. */
export default function FadeImage({
  className = "",
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
