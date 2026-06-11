"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import DetailsModal from "./DetailsModal";
import details from "./details.json";
import useSound from "use-sound";
import Link from "next/link";
import Image from "next/image";
import { useClickSound } from "../components/useClickSound";

type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  model: string;
  position: number[];
  rotation: number[];
  images: string[];
  tech: { id: string; name: string; icon: string }[];
};

const projectDetails = details as ProjectDetail[];
const asTriplet = (values: number[]) => values as [number, number, number];
const MOBILE_MODEL_TARGET_SIZE = 1.8;

const uniqueModelUrls = Array.from(new Set(projectDetails.map((p) => p.model)));
uniqueModelUrls.forEach((url) => {
  useGLTF.preload(url);
});

function RotatingModel({
  model,
  rotation,
  onReady,
}: {
  model: string;
  rotation: number[];
  onReady?: () => void;
}) {
  const { scene } = useGLTF(model);
  const groupRef = useRef<THREE.Group>(null);
  const readyOnceRef = useRef(false);

  const preparedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z, 0.0001);
    const fitScale = MOBILE_MODEL_TARGET_SIZE / maxDimension;

    clone.position.sub(center);
    clone.scale.setScalar(fitScale);

    return {
      scene: clone,
    };

  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.9;
  });

  useEffect(() => {
    if (readyOnceRef.current) return;
    readyOnceRef.current = true;
    onReady?.();
  }, [onReady]);

  return (
    <group ref={groupRef} rotation={asTriplet(rotation)}>
      <primitive object={preparedScene.scene} />
    </group>
  );
}

function ProjectCard({
  project,
  onOpen,
  onReady,
}: {
  project: ProjectDetail;
  onOpen: () => void;
  onReady?: () => void;
}) {
  const [playSelect] = useSound("/sounds/select.mp3");
  const shortDescription =
    project.description.length > 165
      ? `${project.description.slice(0, 165).replace(/\s+\S*$/, "")}...`
      : project.description;

  return (
    <button
      type="button"
      onClick={() => { playSelect(); onOpen(); }}
      className="group w-full overflow-hidden rounded-sm border border-black/20 bg-gray-200/40 text-left shadow-lg transition-transform active:scale-[0.99]"
    >
      <div className="border-b border-black/20 bg-black px-4 py-2 sm:px-5">
        <h2 className="truncate text-2xl font-bold text-gray-200 sm:text-3xl">{project.title}</h2>
      </div>

      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-stretch sm:gap-4 sm:p-4">
        <div className="flex flex-1 flex-row justify-between rounded-sm bg-gray-300/60 p-4 sm:p-5">
          <div className="min-w-0 pr-4">
            <p className="text-sm leading-6 text-gray-700 sm:text-[17px]">{shortDescription}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-600">
              Tap to open details
            </p>
          </div>
          <div className="relative min-h-48 w-[42%] shrink-0 overflow-hidden sm:min-h-0 sm:w-[42%]">
            <Canvas
              camera={{ position: [0, 1.8, 5.6], fov: 30 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              className="pointer-events-none"
            >
              <ambientLight intensity={1.65} />
              <directionalLight position={[3, 6, 4]} intensity={2.15} />
              <directionalLight position={[-3, 1, 3]} intensity={0.8} />
                <Suspense fallback={null}>
                  <RotatingModel
                    model={project.model}
                    rotation={project.rotation}
                    onReady={onReady}
                  />
                </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ProjectsMobile({ onReady }: { onReady?: (id: string) => void }) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const { playThenNavigate } = useClickSound("/sounds/back.mp3");

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:hidden">
      <div className="absolute inset-0 bg-black/10" />

      <header className="relative z-10 mb-6 flex items-end justify-between gap-4 rounded-sm border border-black/20 bg-gray-200/40 px-4 py-4 shadow-lg sm:px-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-gray-700">Selected works</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">My Projects</h1>
        </div>

        <Link href="/" onClick={(e) => { e.preventDefault(); playThenNavigate(() => { window.location.href = "/"; }); }}>
          <Image alt="go_back_home" src="/icons/go_back.jpg" width={100} height={0} unoptimized
          className="shadow-xl rounded-lg hover:scale-110 transition-transform cursor-pointer" />
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-4 md:gap-5">
        {projectDetails.map((project) => (
          <div
            key={project.id}
            className="w-full"
          >
            <ProjectCard
              project={project}
              onOpen={() => setSelectedProject(project)}
              onReady={() => onReady?.(project.id)}
            />
          </div>
        ))}
      </div>

      {selectedProject && (
        <DetailsModal
          title={selectedProject.title}
          description={selectedProject.description}
          images={selectedProject.images}
          techStack={selectedProject.tech}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
