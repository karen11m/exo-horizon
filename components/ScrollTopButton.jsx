"use client";

import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#inicio"
      aria-label="Volver arriba"
      className={`glass fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-lg text-muted transition-all duration-300 hover:text-primary md:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </a>
  );
}