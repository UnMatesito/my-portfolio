"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GraphNode from "./GraphNode";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import DetailsModal from "./DetailsModal";

useGLTF.preload("/models/home.glb");
useGLTF.preload("/models/building.glb");
useGLTF.preload("/models/excavator.glb");
useGLTF.preload("/models/carrera.glb");
useGLTF.preload("/models/suite.glb");
useGLTF.preload("/models/audit.glb");

type Node = {
    id: string;
    position: [number, number, number];
    model: string;
    scale?: [number, number, number];
    rotation?: [number, number, number];
    link?: string;
};

const nodes: Node[] = [
  { id: "home", position: [0, 0, 0], model: "/models/home.glb", scale: [1, 1, 1], rotation: [0, 0.4, 0], link: "/" },
  { id: "building", position: [7, 0, -3.8], model: "/models/building.glb", scale: [1.2, 1.2, 1.2], rotation: [0, -0.6, 0] },
  { id: "excavator", position: [5, 0, 5], model: "/models/excavator.glb", scale: [0.04, 0.025, 0.03], rotation: [0.0, 0.4, 0] },
  { id: "carrera", position: [-3.7, 0, 5], model: "/models/carrera.glb", scale: [1.2, 1.2, 1.2], rotation: [0.0, 0.4, 0] },
  { id: "portfolio", position: [-3, 0, -6], model: "/models/suite.glb", scale: [1.2, 1.2, 1.2], rotation: [0.0, 0.4, 0] },
  { id: "audit", position: [-7, 0.2, 0], model: "/models/audit.glb", scale: [1.2, 1.2, 1.2], rotation: [0.7, 0, 0] },
];

export default function ProyectsGraph() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
              onOpenModal={() => setIsModalOpen(true)}
            />
          ))}
        </Suspense>

        <OrbitControls enableRotate={false} enablePan={false} enableZoom={false} />
      </Canvas>

      {isModalOpen && (
        <DetailsModal
          title="example"
          heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="text-zinc-800 text-2xl font-helvetica font-bold">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-10 translate-y-8">Home</h1>
        <h1 className="absolute bottom-25 left-[25.5%]">Carrera de Mente</h1>
        <h1 className="absolute top-[21.5%] left-[35.1%]">Portfolio</h1>
        <h1 className="absolute bottom-[42%] left-[16%]">S.O.R.A</h1>
        <h1 className="absolute bottom-[9%] right-[23%]">Alkil.ar</h1>
        <h1 className="absolute right-[18%] top-[33%]">Histori.ar</h1>
      </div>
    </div>
  );
}