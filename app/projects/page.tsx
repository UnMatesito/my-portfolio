"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProyectsGraph from "./ProjectsGraph";
import Loading from "../loading";
import ProjectsMobile from "./ProjectsMobile";
import details from "./details.json";

type ViewMode = "desktop" | "mobile";
type ProjectDetail = {
  id: string;
};

const projectDetails = details as ProjectDetail[];
const mobileReadyIds = projectDetails.map((project) => project.id);
const desktopReadyIds = ["home", ...mobileReadyIds];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [revealedView, setRevealedView] = useState<ViewMode | null>(null);
  const [readyByView, setReadyByView] = useState<Record<ViewMode, Set<string>>>(() => ({
    desktop: new Set(),
    mobile: new Set(),
  }));

  const viewMode: ViewMode = isDesktop ? "desktop" : "mobile";
  const expectedReadyIds = useMemo(
    () => (viewMode === "desktop" ? desktopReadyIds : mobileReadyIds),
    [viewMode],
  );
  const isReady = mounted && expectedReadyIds.every((id) => readyByView[viewMode].has(id));
  const loaded = isReady && revealedView === viewMode;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
      setMounted(true);
    };

    const animationFrame = requestAnimationFrame(updateViewport);
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      cancelAnimationFrame(animationFrame);
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!isReady || revealedView === viewMode) return;

    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setRevealedView(viewMode));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [isReady, revealedView, viewMode]);

  const handleReady = useCallback((mode: ViewMode, id: string) => {
    setReadyByView((current) => {
      if (current[mode].has(id)) return current;

      const readyIds = new Set(current[mode]);
      readyIds.add(id);

      return {
        ...current,
        [mode]: readyIds,
      };
    });
  }, []);

  const handleDesktopReady = useCallback((id: string) => handleReady("desktop", id), [handleReady]);
  const handleMobileReady = useCallback((id: string) => handleReady("mobile", id), [handleReady]);

  return (
    <>
      {(!loaded || !mounted) && <Loading />}
      <div
        className={
          loaded && mounted
            ? "min-h-screen w-full bg-projects bg-center bg-cover animate-fade-in"
            : "min-h-screen w-full opacity-0 bg-transparent"
        }
      >
        {isDesktop ? <ProyectsGraph onReady={handleDesktopReady} /> : <ProjectsMobile onReady={handleMobileReady} />}
      </div>
    </>
  );
}
