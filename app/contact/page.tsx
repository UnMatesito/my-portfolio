"use client";
import React from "react";
import Loading from "../loading";
import ContactCard from "./ContactCard";
import Link from "next/link";
import Image from "next/image";
import { useClickSound } from "../components/useClickSound";

const contacts = [
  { title: "Discord", image: "/icons/discord.webp", link: "https://discord.gg/esMcqQm6" },
  { title: "GitHub", image: "/icons/github.webp", link: "https://github.com/UnMatesito" },
  { title: "Instagram", image: "/icons/instagram.webp", link: "https://www.instagram.com/msuarez_1905" },
  { title: "LinkedIn", image: "/icons/linkedin.webp", link: "https://www.linkedin.com/in/msuarez1905/" },
  { title: "Send E-mail", image: "/icons/mail.webp", link: "mailto:mateonicolassuarez19@gmail.com" },
];

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [assetsReady, setAssetsReady] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const { playThenNavigate } = useClickSound("/sounds/back.mp3");

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
      setMounted(true);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  React.useEffect(() => {
    if (mounted && assetsReady >= 6) {
      const firstFrame = requestAnimationFrame(() => {
        const secondFrame = requestAnimationFrame(() => setLoading(false));
        return () => cancelAnimationFrame(secondFrame);
      });

      return () => cancelAnimationFrame(firstFrame);
    }

    setLoading(true);
  }, [assetsReady, mounted]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 bg-contact bg-center bg-cover animate-fade-in">
      {loading && <Loading />}
      <div className="fixed left-0 top-0 z-10 flex w-screen items-center justify-between bg-linear-to-r from-orange-400 to-transparent p-4 shadow-md sm:p-6">
        <h1 className="text-5xl font-light text-white">Contact</h1>
        <Link href="/" onClick={(e) => { e.preventDefault(); playThenNavigate(() => { window.location.href = "/"; }); }}>
          <Image alt="go_back_home" src="/icons/go_back.jpg" width={80} height={0} unoptimized
          className="shadow-xl rounded-lg hover:scale-102 transition-transform cursor-pointer" onLoad={() => setAssetsReady((count) => count + 1)} />
        </Link>        
      </div>
      <div className="min-h-full w-full">
        {mounted && !isDesktop && (
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 pt-28 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact, index) => (
              <div
                key={contact.title}
                className={index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}
              >
                <ContactCard
                  title={contact.title}
                  image={contact.image}
                  link={contact.link}
                  compact
                  className="border border-white/15"
                  onImageLoad={() => setAssetsReady((count) => count + 1)}
                />
              </div>
            ))}
          </div>
        )}

        {mounted && isDesktop && (
          <div className="absolute inset-0 hidden xl:block">
            <div className="absolute left-[14%] top-[15%]">
              <ContactCard title="Discord" image="/icons/discord.webp" link="https://discord.gg/esMcqQm6" onImageLoad={() => setAssetsReady((count) => count + 1)} />
            </div>

            <div className="absolute right-[3%] top-[15%]">
              <ContactCard title="GitHub" image="/icons/github.webp" link="https://github.com/UnMatesito" onImageLoad={() => setAssetsReady((count) => count + 1)} />
            </div>

            <div className="absolute left-[5%] top-[45%]">
              <ContactCard title="Instagram" image="/icons/instagram.webp" link="https://www.instagram.com/msuarez_1905" onImageLoad={() => setAssetsReady((count) => count + 1)} />
            </div>

            <div className="absolute right-[14%] top-[45%]">
            <ContactCard title="LinkedIn" image="/icons/linkedin.webp" link="https://www.linkedin.com/in/msuarez1905/" onImageLoad={() => setAssetsReady((count) => count + 1)} />
            </div>

            <div className="absolute right-[20%] top-[75%]">
              <ContactCard title="Send E-mail" image="/icons/mail.webp" link="mailto:mateonicolassuarez19@gmail.com" onImageLoad={() => setAssetsReady((count) => count + 1)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
