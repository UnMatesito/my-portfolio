"use client";

import { Carousel } from "flowbite-react";

export type TechItem = {
  name: string;
  iconClass: string;
  iconColorClass?: string;
};

type TechCarrouselProps = {
  title: string;
  items: TechItem[];
  intervalMs?: number;
};

export default function TechCarrousel({
  title,
  items,
  intervalMs = 5000,
}: TechCarrouselProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-[22rem] min-w-[16rem]">
      <h3 className="h-16 md:h-20 flex items-center justify-center text-3xl md:text-4xl font-bold">
        {title}
      </h3>

      <div className="mt-4 h-56 md:h-52 overflow-hidden rounded-md">
        <Carousel
          className="h-full w-full"
          slideInterval={intervalMs}
          indicators={false}
          pauseOnHover
          draggable={true}
          theme={{
            item: {
              base: "block w-full h-full",
            },
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="h-full w-full flex flex-col items-center justify-center gap-2 px-10 text-center"
            >
              <i
                className={`${item.iconClass} ${item.iconColorClass ?? ""} text-7xl leading-none`}
              />
              <p className="text-2xl leading-tight">{item.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}