"use client";

import Image from "next/image";
import Link from "next/link";
import { useClickSound } from "../components/useClickSound";

export default function ContactCard({
  image,
  title,
  link,
  compact = false,
  className = "",
  onImageLoad,
}: {
  image: string;
  title: string;
  link: string;
  compact?: boolean;
  className?: string;
  onImageLoad?: () => void;
}) {
  const externalTarget = link.startsWith("http") ? "_blank" : undefined;
  const { playThenNavigate } = useClickSound("/sounds/license_select.mp3");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playThenNavigate(() => {
      window.location.href = link;
    });
  };

    return (
        <Link href={link} target={externalTarget} className="w-full" onClick={handleClick}>
            <div className={`relative overflow-hidden rounded-md bg-black/40 shadow-xl transition-transform hover:scale-105 ${compact ? "aspect-[4/3] w-full" : "xl:h-45 xl:w-130 2xl:h-45 2xl:w-150"} ${className}`}>
                <Image
                    src={image}
                    alt={title + "_image"}
                    fill
                    className="object-cover rounded-md"
                    onLoad={onImageLoad}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <h1 className={`relative flex h-full items-end p-4 font-bold tracking-wide text-white drop-shadow-lg ${compact ? "text-3xl" : "text-4xl"}`}>{title}</h1>
            </div>
        </Link>
    );
}
