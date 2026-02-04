"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GraphNode from './GraphNode';

type node = {
  id: string;
  position: [number, number, number];
  links: string[];
}

const nodes: node[] = [
  {
    id: "home",
    position: [0, 0, 0],
    links: ["license"],
  },
  {
    id: "license",
    position: [4, 0, -2],
    links: ["home", "events"],
  },
  {
    id: "events",
    position: [8, 0, 1],
    links: ["license"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-projects bg-cover bg-center">
      <div className="w-full h-screen">
        <Canvas camera={{ position: [4, 6, 10], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} />

          {/* Nodos */}
          {nodes.map((node) => (
            <GraphNode key={node.id} position={node.position} />
          ))}

          {/* Cámara tipo mapa */}
          <OrbitControls
            enableRotate={true}
            enablePan={true}
            enableZoom={false}
          />
        </Canvas>
      </div>
    </div>
  );
}
