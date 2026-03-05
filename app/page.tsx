"use client";

import VerticalOptions from "./components/verticalOptions";
import Image from "next/image";
import React from "react";
import Loading from "./loading";

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
    <div className="animate-fade-in">
        <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover -z-10">
            <source src="/backgrounds/bg-home.webm" type="video/mp4" />
        </video>
        <div className="fixed top-0 left-0 w-full h-full bg-black/10"></div>
        <div className="min-h-screen flex flex-col items-center justify-center gap-20">
            <div className="font-helvetica gap-4 flex flex-col items-center">
                <Image src="/svg/signature.svg" alt="Mateo Suarez" width={0} height={0} className="mb-4 selection-none w-100 drop-shadow-xl drop-shadow-gray-50" />
                <div className="">
                    <h1 className="font-bold italic text-6xl uppercase drop-shadow-md drop-shadow-gray-50">Mateo Suarez</h1>
                    <h2 className="font-bold text-2xl drop-shadow-md drop-shadow-gray-50">The Real Front-End Developer</h2>
                </div>
            </div>

            <div>
                <VerticalOptions />
            </div>
        </div>
    </div>
    );
}
