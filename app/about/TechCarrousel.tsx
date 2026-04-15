"use client";

import { useState, useEffect } from "react";

export type TechItem = {
  name: string;
  iconClass: string;
};

type TechCarrouselProps = {
  title: string;
  items: TechItem[];
  intervalMs?: number;
};

export default function TechCarrousel({
  title,
  items,
  intervalMs = 3000,
}: TechCarrouselProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        setAnimating(false);
      }, 300);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-[22rem] min-w-[16rem]">
      <h3 className="h-14 md:h-20 flex items-center justify-center text-3xl md:text-4xl font-bold">
        {title}
      </h3>

      <div className="mt-4 h-48 overflow-hidden relative flex flex-col items-center justify-center gap-3">
        <div
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out ${
            animating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <i className={`${items[current].iconClass} text-7xl leading-none`} />
          <p className="text-2xl font-semibold leading-tight">
            {items[current].name}
          </p>
        </div>
      </div>
    </div>
  );
}