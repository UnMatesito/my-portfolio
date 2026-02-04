"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const modes = [
  { id: 1, title: "About Me", link: "/about" },
  { id: 2, title: "My Projects", link: "/projects" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "Settings", link: "/settings" },
];

const ITEM_HEIGHT = 58; // Altura de cada elemento en píxeles

export default function VerticalOptions() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const clamp = (value: number) =>
    Math.max(0, Math.min(modes.length - 1, value));

  const moveUp = () => setActive((prev) => clamp(prev - 1));
  const moveDown = () => setActive((prev) => clamp(prev + 1));

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) moveDown();
    else moveUp();
  };

  const handleClick = () => {
    router.push(modes[active].link);
  };

  return (
    <div
      onWheel={handleWheel}
      onClick={handleClick}
      className="relative h-40 w-full overflow-hidden font-helvetica cursor-pointer select-none"
    >
      {/* Flecha arriba */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          moveUp();
        }}
        disabled={active === 0}
        className="absolute top-0 z-20 left-1/2 -translate-x-1/2 disabled:opacity-30"
      >
        <Image
          src="/svg/selection_arrow.svg"
          alt="up"
          width={0}
          height={0}
          className="transition-transform duration-300 size-16 drop-shadow-md"
          style={{
            transform: `translateY(${active === 0 ? 0 : 6}px)`
          }}
        />
      </button>

      {/* Flecha abajo */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          moveDown();
        }}
        disabled={active === modes.length - 1}
        className="absolute bottom-0 z-20 left-1/2 -translate-x-1/2 disabled:opacity-30"
      >
        <Image
          src="/svg/selection_arrow.svg"
          alt="down"
          width={0}
          height={0}
          className="rotate-180 transition-transform duration-300 size-16 drop-shadow-md"
          style={{
            transform: `translateY(${active === modes.length - 1 ? 0 : -6}px)`
          }}
        />
      </button>

      {/* Lista */}
      <div
        className="flex flex-col items-center gap-6 px-12 transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${56 - active * ITEM_HEIGHT}px)`
        }}
      >
        {modes.map((mode, index) => {
          const isActive = index === active;

          return (
            <div
              key={mode.id}
              className={`
                text-center transition-all duration-300 drop-shadow-lg
                ${isActive
                  ? "scale-110 text-white"
                  : "scale-90 text-white/40 blur-[1px]"}
              `}
            >
              <div className="text-3xl font-bold italic leading-tight">
                {mode.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
