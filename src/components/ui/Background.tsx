"use client";

import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <Image
        src="/background.webp"
        alt="Background"
        fill
        className="object-cover object-center"
        quality={100}
        priority
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      {/* Optional: Add a subtle gradient mesh or noise if desired later */}
    </div>
  );
}
