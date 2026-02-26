"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GraphNode from "./GraphNode";

type Node = {
    id: string;
    position: [number, number, number];
    model: string;
    scale?: [number, number, number];
};

const nodes: Node[] = [
  { id: "home", position: [0, 0, 0], model: "/models/home.glb", scale: [0.5, 0.5, 0.5] },
  { id: "building", position: [4, 0, -2], model: "/models/building.glb", scale: [0.5, 0.5, 0.5] },
  { id: "excavator", position: [8, 0, 1], model: "/models/excavator.glb", scale: [0.02, 0.015, 0.015] },
  { id: "carrera", position: [4, 7, 10], model: "/models/carrera.glb", scale: [0.5, 0.5, 0.5] },
  { id: "portfolio", position: [16, 0, 1], model: "/models/suite.glb", scale: [0.5, 0.5, 0.5] },
  { id: "audit", position: [20, 0, 1], model: "/models/audit.glb", scale: [0.5, 0.5, 0.5] },
];

export default function ProyectsGraph() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [8, 6, 14], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />

        <Suspense fallback={null}>
          {nodes.map((node) => (
            <GraphNode key={node.id} position={node.position} model={node.model} scale={node.scale} />
          ))}
        </Suspense>

        <OrbitControls enableRotate={false} enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}