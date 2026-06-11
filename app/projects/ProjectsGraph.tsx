"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import DetailsModal from "./DetailsModal";
import GraphNode from "./GraphNode";
import details from "./details.json";

type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  model: string;
  modelScale: number[];
  position: number[];
  rotation: number[];
  images: string[];
  tech: { id: string; name: string; icon: string }[];
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

type LabelProjection = {
  id: string;
  title: string;
  left: number;
  top: number;
  visible: boolean;
};

const projectDetails = details as ProjectDetail[];
const asTriplet = (values: number[]) => values as [number, number, number];
const GRAPH_FOV = 16;

const GRAPH_CAMERA_DIRECTION = new THREE.Vector3(0, 25, 30).normalize();

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
    position: asTriplet(project.position),
    model: project.model,
    scale: asTriplet(project.modelScale),
    rotation: asTriplet(project.rotation),
  })),
];

Array.from(new Set(nodes.map((node) => node.model))).forEach((modelPath) => {
  useGLTF.preload(modelPath);
});

const graphBounds = new THREE.Box3().setFromPoints(nodes.map((node) => new THREE.Vector3(...node.position)));
const graphSize = graphBounds.getSize(new THREE.Vector3());
const graphCenter = graphBounds.getCenter(new THREE.Vector3());
const graphTarget: [number, number, number] = [graphCenter.x, 0, graphCenter.z];
const labelSources = nodes.map(({ id, title }) => ({ id, title }));

function ResponsiveGraphCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();

  const GRAPH_FIT_PADDING = size.width >= 1024 && size.width < 1280 ? 1 : 0;

  const fit = useMemo(() => {
    if (size.width === 0 || size.height === 0) return null;

    const aspect = size.width / size.height;
    const verticalFov = THREE.MathUtils.degToRad(GRAPH_FOV);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
    const widthDistance = (graphSize.x + GRAPH_FIT_PADDING * 2) / (2 * Math.tan(horizontalFov / 2));
    const depthDistance = (graphSize.z + GRAPH_FIT_PADDING * 2) / (2 * Math.tan(verticalFov / 2));
    const distance = Math.max(widthDistance, depthDistance, 30) * 1.08;
    const target = new THREE.Vector3(...graphTarget);

    return {
      position: target.clone().add(GRAPH_CAMERA_DIRECTION.clone().multiplyScalar(distance)),
      target,
      aspect,
    };
  }, [size.height, size.width, GRAPH_FIT_PADDING]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera || !fit) return;

    camera.fov = GRAPH_FOV;
    camera.aspect = fit.aspect;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.copy(fit.position);
    camera.lookAt(fit.target);
    camera.updateProjectionMatrix();
  }, [fit]);

  if (!fit) return null;

  return <PerspectiveCamera ref={cameraRef} makeDefault position={fit.position.toArray() as [number, number, number]} fov={GRAPH_FOV} near={0.1} far={1000} />;
}

function ProjectedLabelUpdater({
  anchors,
  onUpdate,
}: {
  anchors: Record<string, [number, number, number]>;
  onUpdate: (positions: LabelProjection[]) => void;
}) {
  const projectedPoint = useRef(new THREE.Vector3());
  const lastSignature = useRef("");

  useFrame(({ camera, size }) => {
    const nextPositions = labelSources.map((label) => {
      const anchor = anchors[label.id];

      if (!anchor) {
        return { ...label, left: 0, top: 0, visible: false };
      }

      projectedPoint.current.fromArray(anchor).project(camera);
      const left = Math.round((projectedPoint.current.x * 0.5 + 0.5) * size.width);
      const top = Math.round((-projectedPoint.current.y * 0.5 + 0.5) * size.height);
      const visible = projectedPoint.current.z >= -1 && projectedPoint.current.z <= 1;

      return { ...label, left, top, visible };
    });

    const signature = nextPositions
      .map((label) => `${label.id}:${label.left}:${label.top}:${label.visible ? 1 : 0}`)
      .join("|");

    if (signature !== lastSignature.current) {
      lastSignature.current = signature;
      onUpdate(nextPositions);
    }
  });

  return null;
}

export default function ProyectsGraph({ onReady }: { onReady?: (id: string) => void }) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [labelAnchors, setLabelAnchors] = useState<Record<string, [number, number, number]>>({});
  const [labelPositions, setLabelPositions] = useState<LabelProjection[]>([]);

  const visibleLabels = useMemo(() => labelPositions.filter((label) => label.visible), [labelPositions]);

  const handleAnchorReady = useCallback((id: string, anchor: [number, number, number]) => {
    setLabelAnchors((current) => {
      const existing = current[id];
      if (existing && existing.every((value, index) => Math.abs(value - anchor[index]) < 0.001)) {
        return current;
      }

      return {
        ...current,
        [id]: anchor,
      };
    });
  }, []);

  const openProjectDetails = (projectId: string) => {
    const project = projectDetails.find((item) => item.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        camera={{ position: [0, 25, 30], fov: GRAPH_FOV, far: 1000, near: 0.1 }}
      >
        <ResponsiveGraphCamera />

        <ambientLight intensity={1.25} />
        <directionalLight position={[0, 30, 15]} />

        <ContactShadows
          position={[0, 0, 0]}
          opacity={1.2}
          blur={1}
          scale={25}
          far={30}
          resolution={2048}
          color="#000000"
        />

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
              id={node.id}
              position={node.position}
              model={node.model}
              scale={node.scale}
              rotation={node.rotation}
              link={node.link || ""}
              onReady={onReady}
              onAnchorReady={handleAnchorReady}
              onOpenModal={() => openProjectDetails(node.id)}
            />
          ))}
        </Suspense>

        <ProjectedLabelUpdater anchors={labelAnchors} onUpdate={setLabelPositions} />

        <OrbitControls target={graphTarget} enableRotate={false} enablePan={false} enableZoom={false} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {visibleLabels.map((label) => (
          <h1
            key={label.id}
            className="absolute max-w-56 -translate-x-1/2 translate-y-3 whitespace-nowrap text-center text-[clamp(1rem,1.2vw+0.55rem,1.875rem)] font-extrabold tracking-normal text-zinc-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.55)]"
            style={{ left: label.left, top: label.top }}
          >
            {label.title}
          </h1>
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
