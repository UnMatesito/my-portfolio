"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GtSpinner } from "./components/GtSpinner";

export default function Loading() {
  const [showSignature, setShowSignature] = useState<boolean | null>(null);

  useEffect(() => {
    setShowSignature(Math.random() > 0.5);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-20">
      <div className="font-helvetica text-center flex flex-col items-center">
        <div className="h-32 flex items-center justify-center">
          {showSignature === null ? (
            <div className="w-100 h-32" />
          ) : showSignature ? (
            <Image
              src="/svg/signature.svg"
              alt="Mateo Suarez"
              width={0}
              height={0}
              className="w-100 invert mb-48"
            />
          ) : (
            <h1 className="text-white font-bold text-9xl mb-20">MS</h1>
          )}
        </div>
        <GtSpinner />
      </div>
    </div>
  );
}