"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import TechPill from "../components/TechPill";
import { useClickSound } from "../components/useClickSound";

export default function Modal({
  title,
  description,
  images,
  techStack,
  onClose,
}: {
  title: string;
  description: string;
  images: string[];
  techStack: { id: string; name: string; icon: string }[];
  onClose: () => void;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCompactView, setIsCompactView] = useState(false);
  const { play } = useClickSound("/sounds/back.mp3");

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  const placeholderImages = [
    "https://placehold.co/1600x900/6b7280/FFFFFF?text=Placeholder+1",
    "https://placehold.co/1600x900/525566/FFFFFF?text=Placeholder+2",
    "https://placehold.co/1600x900/374151/FFFFFF?text=Placeholder+3",
  ];

  const displayedImages = [...images.slice(0, 3), ...placeholderImages].slice(0, 3);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateView = () => setIsCompactView(mediaQuery.matches);

    updateView();
    mediaQuery.addEventListener("change", updateView);

    return () => {
      mediaQuery.removeEventListener("change", updateView);
    };
  }, []);

  useEffect(() => {
    if (!isCompactView || displayedImages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % displayedImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [displayedImages.length, isCompactView]);

  return (
    <>
      <div className="fixed inset-0 z-100 flex items-center justify-center animate-appear-from-bottom px-3 py-4 sm:px-4">
        <div className="flex h-full w-full items-center justify-center backdrop-blur-xs">
          <div className="flex max-h-[92vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-sm bg-gray-200/40 shadow-lg">
            <div className="shrink-0 rounded-t-sm bg-black py-2 text-center font-bold text-lg text-gray-400 sm:text-2xl">
              <h1>{title}</h1>
            </div>

            <div className="mx-2 mt-2 flex min-h-0 flex-1 flex-col rounded-sm bg-gray-300/60 text-lg font-light lg:flex-row">
              <div className="rounded-t-sm bg-zinc-400/60 p-2 lg:max-w-[35%] lg:rounded-l-sm lg:rounded-tr-none">
                {isCompactView ? (
                  <button
                    type="button"
                    className="block w-full cursor-zoom-in overflow-hidden rounded-sm"
                    onClick={() => {
                      setLightboxIndex(activeImageIndex);
                      setLightboxOpen(true);
                    }}
                  >
                    <Image
                      src={displayedImages[activeImageIndex]}
                      alt={"Project image " + (activeImageIndex + 1)}
                      width={1920}
                      height={1080}
                      className="h-56 w-full rounded-sm object-cover transition-opacity duration-500 sm:h-64 md:h-72"
                    />
                  </button>
                ) : (
                  <div className="max-h-56 space-y-2 overflow-y-auto lg:max-h-none lg:w-[330px]">
                    {displayedImages.map((src, index) => (
                      <button
                        key={`${src}-${index}`}
                        type="button"
                        className="block w-full cursor-zoom-in"
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                      >
                        <Image
                          src={src}
                          alt={"Project image " + (index + 1)}
                          width={1920}
                          height={1080}
                          className="h-36 w-full rounded-sm object-cover sm:h-40"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {isCompactView && displayedImages.length > 1 && (
                  <div className="mt-2 flex items-center justify-center gap-2 pb-1">
                    {displayedImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Show image ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          index === activeImageIndex ? "bg-black scale-110" : "bg-black/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="w-full flex-1 overflow-y-auto p-3 text-sm sm:text-[18px] lg:p-2">
                  <p>{description}</p>
                </div>

                <div className="shrink-0 rounded-b-sm bg-linear-to-r from-zinc-900 to-transparent p-3 lg:rounded-br-sm lg:p-2">
                  <h2 className="mb-2 text-base font-bold italic text-white sm:text-lg">Tech Stack:</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((tech) => (
                      <TechPill key={tech.id} pillId={tech.id} name={tech.name} logo={tech.icon} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-center py-3">
              <Button
                className="h-10 rounded-full px-10 text-lg font-bold text-black focus:ring-0 sm:h-8 sm:px-25 sm:text-2xl"
                color="primary"
                onClick={() => { play(); onClose(); }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={displayedImages.map((src) => ({ src }))}
      />
    </>
  );
}
