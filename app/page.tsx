"use client";

import VerticalOptions from "./components/verticalOptions";
import Image from "next/image";
import React from "react";
import Loading from "./loading";

export default function Home() {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [videoReady, setVideoReady] = React.useState(false);
    const actualYear = new Date().getFullYear();
    
    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const markReady = () => {
            if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
                setVideoReady(true);
            }
        };

        markReady();
        video.addEventListener("canplaythrough", markReady);
        video.addEventListener("loadeddata", markReady);

        return () => {
            video.removeEventListener("canplaythrough", markReady);
            video.removeEventListener("loadeddata", markReady);
        };
    }, []);

    React.useEffect(() => {
        if (videoReady) {
            const firstFrame = requestAnimationFrame(() => {
                const secondFrame = requestAnimationFrame(() => setLoading(false));
                return () => cancelAnimationFrame(secondFrame);
            });

            return () => cancelAnimationFrame(firstFrame);
        }
    }, [videoReady]);

    return (
    <div className="relative min-h-screen animate-fade-in">
        {loading && <Loading />}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`fixed top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        >
            <source src="/backgrounds/bg-home.webm" type="video/mp4" />
        </video>
        <div className="fixed top-0 left-0 w-full h-full bg-black/10"></div>
        <div className={`min-h-screen flex flex-col items-center justify-center gap-20 transition-opacity duration-300 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="gap-4 flex flex-col items-center justify-center">
                <Image src="/svg/signature.svg" alt="Mateo Suarez" width={0} height={0} className="mb-4 selection-none w-80 md:w-100 drop-shadow-xl drop-shadow-gray-50" />
                <div className="font-bold">
                    <h1 className="italic text-5xl md:text-7xl uppercase drop-shadow-md drop-shadow-gray-50">Mateo Suarez</h1>
                    <h2 className="text-xl md:text-2xl drop-shadow-md drop-shadow-gray-50">The Real Software Developer</h2>
                </div>
            </div>

            <div>
                <VerticalOptions />
            </div>

            <p className="text-sm md:text-lg text-gray-200 drop-shadow-sm block lg:hidden italic">
                For a better experience, please use a desktop browser.
            </p>
        </div>

        <p className="absolute bottom-0 right-0 font-mono backdrop-blur-sm p-2 text-white rounded-tl-lg px-3 text-center">{actualYear} - Mateo Suarez</p>
    </div>
    );
}
