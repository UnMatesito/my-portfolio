"use client";

import { useState } from "react";
import ProyectsGraph from "./ProyectsGraph";
import Loading from "../loading";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function Home() {
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setLoaded(true), 500); // delay suave
    }
  }, [progress]);

  return (
    <>
      {!loaded && <Loading />}
      <div className={loaded ? "bg-projects bg-center bg-cover w-full h-screen" : "w-full h-screen opacity-0 bg-transparent"}>
        <ProyectsGraph />
      </div>
    </>
  );
}