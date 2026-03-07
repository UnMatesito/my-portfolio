"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GraphNode from "./GraphNode";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import DetailsModal from "./DetailsModal";
import details from "./details.json";

type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  model: string;
  modelScale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  images: string[];
  tech: { name: string; icon: string }[];
};

type Node = {
  id: string;
  title: string;
  position: [number, number, number];
  model: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  link?: string;
};

const projectDetails = details as ProjectDetail[];

const nodes: Node[] = [
  {
    id: "home",
    title: "Home",
    position: [0, 0, 0],
    model: "/models/home.glb",
    scale: [1, 1, 1],
    rotation: [0, 0.4, 0],
    link: "/",
  },
  ...projectDetails.map((project) => ({
    id: project.id,
    title: project.title,
    position: project.position,
    model: project.model,
    scale: project.modelScale,
    rotation: project.rotation,
  })),
];

Array.from(new Set(nodes.map((node) => node.model))).forEach((modelPath) => {
  useGLTF.preload(modelPath);
});

const labelPositionById: Record<string, string> = {
  home: "absolute top-1/2 left-1/2 -translate-x-10 translate-y-8",
  carrera: "absolute bottom-25 left-[25.5%]",
  portfolio: "absolute top-[21.5%] left-[35.1%]",
  audit: "absolute bottom-[42%] left-[16%]",
  excavator: "absolute bottom-[9%] right-[23%]",
  building: "absolute right-[18%] top-[33%]",
};

export default function ProyectsGraph() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const openProjectDetails = (projectId: string) => {
    const project = projectDetails.find((item) => item.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };
  
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        camera={{ position: [0, 25, 30], fov: 16, far: 1000, near: 0.1 }}
      >
        <ambientLight intensity={1.25} />

        <directionalLight
          position={[0, 30, 15]}
        />

        <ContactShadows
          position={[0, 0, 0]}
          opacity={1.2}        // antes 0.45
          blur={1}           // antes 2.5
          scale={25}
          far={30}
          resolution={2048}
          color="#000000"      // negro puro
        />

        {/* Un solo plano: color transparente + recibe sombra */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial
            color="#9ca3af"
            transparent
            opacity={0.18}
            roughness={1}
            metalness={0}
          />
        </mesh>

        <Suspense fallback={null}>
          {nodes.map((node) => (
            <GraphNode
              key={node.id}
              position={node.position}
              model={node.model}
              scale={node.scale}
              rotation={node.rotation}
              link={node.link || "" }
              onOpenModal={() => openProjectDetails(node.id)}
            />
          ))}
        </Suspense>

        <OrbitControls enableRotate={false} enablePan={false} enableZoom={false} />
      </Canvas>

      {selectedProject && (
        <DetailsModal
          title={selectedProject.title}
          description={selectedProject.description}
          images={selectedProject.images}
          techStack={selectedProject.tech}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div className="text-zinc-800 text-2xl font-helvetica font-bold">
        {nodes
          .filter((node) => labelPositionById[node.id])
          .map((node) => (
            <h1 key={node.id} className={labelPositionById[node.id]}>
              {node.title}
            </h1>
          ))}
      </div>
    </div>
  );
}