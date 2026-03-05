import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

type GraphNodeProps = {
  position: [number, number, number];
  model: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  link: string | "";
  onOpenModal?: () => void;
};

export default function GraphNode({ position, model, scale, rotation, link, onOpenModal  }: GraphNodeProps) {
  const { scene } = useGLTF(model);
  const router = useRouter();

  const groupRef = useRef<THREE.Group>(null);
  const isHoveredRef = useRef(false);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const normalizeAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isHoveredRef.current) {
      groupRef.current.rotation.y += delta * 2.8; // gira mientras hover
    } else {
      const current = normalizeAngle(groupRef.current.rotation.y);
      groupRef.current.rotation.y = THREE.MathUtils.damp(current, 0, 7, delta); // retorno sutil
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        isHoveredRef.current = true;
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        isHoveredRef.current = false;
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (link !== "") {
          router.push(link);
        } else {
          onOpenModal?.();
        }
      }}
    >
      <primitive object={clonedScene} scale={scale} rotation={rotation} />
    </group>
  );
}