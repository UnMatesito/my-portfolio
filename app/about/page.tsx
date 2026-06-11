"use client";

import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";
import React from "react";
import TechCarrousel, { TechItem } from "./TechCarrousel";
import { useClickSound } from "../components/useClickSound";

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [assetsReady, setAssetsReady] = React.useState(0);
  const { playThenNavigate } = useClickSound("/sounds/back.mp3");

  const languageItems: TechItem[] = [
    { name: "JavaScript", iconClass: "devicon-javascript-plain" },
    { name: "TypeScript", iconClass: "devicon-typescript-plain" },
    { name: "Python", iconClass: "devicon-python-plain" },
    { name: "PHP", iconClass: "devicon-php-plain" },
  ];

  const frameworkItems: TechItem[] = [
    { name: "React", iconClass: "devicon-react-original" },
    { name: "Next.js", iconClass: "devicon-nextjs-plain" },
    { name: "Laravel", iconClass: "devicon-laravel-plain" },
    { name: "Flask", iconClass: "devicon-flask-original" },
  ];

  const dbmsItems: TechItem[] = [
    { name: "MySQL", iconClass: "devicon-mysql-plain" },
    { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
    { name: "MongoDB", iconClass: "devicon-mongodb-plain" },
  ];

  const devToolItems: TechItem[] = [
    { name: "Docker", iconClass: "devicon-docker-plain" },
    { name: "Git", iconClass: "devicon-git-plain" },
    { name: "GitHub", iconClass: "devicon-github-original" },
  ];

  React.useEffect(() => {
    if (assetsReady >= 2) {
      const firstFrame = requestAnimationFrame(() => {
        const secondFrame = requestAnimationFrame(() => setLoading(false));
        return () => cancelAnimationFrame(secondFrame);
      });

      return () => cancelAnimationFrame(firstFrame);
    }

    setLoading(true);
  }, [assetsReady]);

  React.useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen flex flex-col items-center animate-fade-in scroll-smooth">
        {loading && <Loading />}
        <div className="patterned-background w-screen h-[100%] absolute top-0 left-0 -z-10"></div>
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-transparent via-black to-transparent shadow-lg text-white w-screen text-center py-1">About Me</h1>
        <div className="bg-gray-200/40 rounded-sm p-4 max-w-screen text-center text-lg mx-4">
            <div className="bg-zinc-400/60 rounded-sm p-4 flex flex-col xl:flex-row items-center gap-4 shadow-lg">
                <Image src="/img/me.jpg" alt="Profile Image" width={600} height={600} className="rounded-sm" unoptimized onLoad={() => setAssetsReady((count) => count + 1)}/>
                <div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">Hello! My name is Mateo Suarez</h1>
                  <p className="sm:text-xl lg:text-2xl text-left px-8">I&apos;m a passionate software developer with a love to create innovative and beautiful solutions. My goal is always learn new things along the way and enjoy the process, always looking for opportunities to grow as a developer. Front-end development is my passion, and I strive to create user-friendly and visually appealing interfaces with modern technologies, great interactivity and applying the best practices for clean and maintainable codebase.</p>
                  <p className="sm:text-xl lg:text-2xl mt-4 text-left px-8">I have experience working with various programming languages and frameworks, always aiming to deliver high-quality software that meets the needs of users and stakeholders.</p>
                  <p className="sm:text-xl lg:text-2xl mt-4 text-left px-8">Gaming and Motorsport are some of my greatest passions. 3D modeling, 3D printing and building models are also hobbies I enjoy in my free time.</p>
                </div>
            </div>

            <div className="bg-zinc-400/60 rounded-sm flex flex-col items-center gap-4 mt-20 shadow-lg">
                <h2 className="text-3xl font-bold bg-linear-to-r from-amber-900/70 to-transparent w-full text-white text-left p-2 rounded-t-sm">Tecnologies I use</h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mb-8 px-10">
                  <TechCarrousel title="Languages" items={languageItems} />
                  <TechCarrousel title="Frameworks" items={frameworkItems} />
                  <TechCarrousel title="DBMS" items={dbmsItems} />
                  <TechCarrousel title="Dev Tools" items={devToolItems} />
                </div>
            </div>

            <div className="bg-zinc-400/60 rounded-sm flex flex-col items-center gap-4 mt-20 shadow-lg">
                <h2 className="text-3xl font-bold bg-linear-to-r from-amber-900/70 to-transparent w-full text-white text-left p-2 rounded-t-sm">Experience</h2>
                <div className="h-40 flex items-center">
                  <p className="text-5xl mb-4 font-bold">WIP...</p>
                </div>
            </div>
        </div>

        <Link href="/" className="fixed bottom-6 right-6" onClick={(e) => { e.preventDefault(); playThenNavigate(() => { window.location.href = "/"; }); }}>
          <Image alt="go_back_home" src="/icons/go_back.jpg" width={100} height={0} unoptimized
          className="shadow-xl rounded-lg hover:scale-110 transition-transform cursor-pointer" onLoad={() => setAssetsReady((count) => count + 1)} />
        </Link>
    </div>
  );
}
