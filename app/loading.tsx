"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GtSpinner } from "./components/GtSpinner";

export default function Loading() {
  const [showSignature, setShowSignature] = useState<boolean | null>(null);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setShowSignature(Math.random() > 0.5);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center gap-20 bg-black overscroll-none touch-none">
      <div className="font-helvetica text-center flex flex-col items-center">
        <div className="h-32 flex items-center justify-center">
          {showSignature === null ? (
            <div className="mb-48 h-32 w-100" aria-hidden="true" />
          ) : showSignature ? (
            <Image
              src="/svg/signature.svg"
              alt="Mateo Suarez"
              width={0}
              height={0}
              className="w-80 md:w-100 invert mb-48"
              loading="eager"
            />
          ) : (
            <h1 className="text-white font-bold text-9xl mb-20 select-none pointer-events-none">MS</h1>
          )}
        </div>
        <GtSpinner />
      </div>
    </div>
  );
}
