"use client";
import React from "react";
import Loading from "../loading";
import ContactCard from "./ContactCard";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 bg-contact bg-center bg-cover animate-fade-in">
      <div className="w-screen bg-linear-to-r from-orange-400 to-transparent p-6 fixed top-0 left-0 shadow-md z-10 flex items-center justify-between">
        <h1 className="text-5xl font-light text-white">Contact</h1>
        <Link href="/">
          <Image alt="go_back_home" src="/icons/go_back.jpg" width={80} height={0} unoptimized
          className="shadow-xl rounded-lg hover:scale-102 transition-transform cursor-pointer" />
        </Link>        
      </div>
      <div className="min-h-full w-full">
        <div className="absolute left-[14%] top-[15%]">
          <ContactCard title="Discord" image="/icons/discord.webp" link="https://discord.gg/esMcqQm6"/>
        </div>

        <div className="absolute right-[3%] top-[15%]">
          <ContactCard title="GitHub" image="/icons/github.webp" link="https://github.com/UnMatesito"/>
        </div>

        <div className="absolute left-[5%] top-[45%]">
          <ContactCard title="Instagram" image="/icons/instagram.webp" link="https://www.instagram.com/msuarez_1905"/>
        </div>

        <div className="absolute right-[14%] top-[45%]">
        <ContactCard title="LinkedIn" image="/icons/linkedin.webp" link="https://www.linkedin.com/in/msuarez1905/"/>
        </div>

        <div className="absolute right-[20%] top-[75%]">
          <ContactCard title="Send E-mail" image="/icons/mail.webp" link="mailto:mateonicolassuarez19@gmail.com"/>
        </div>
      </div>
    </div>
  );
}