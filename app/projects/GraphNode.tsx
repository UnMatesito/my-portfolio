import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

type VectorTriplet = [number, number, number];

type GraphNodeProps = {
  id: string;
  position: VectorTriplet;
  model: string;
  scale?: VectorTriplet;
  rotation?: VectorTriplet;
  link: string | "";
  onOpenModal?: () => void;
  onAnchorReady?: (id: string, anchor: VectorTriplet) => void;
  onReady?: (id: string) => void;
};

export default function GraphNode({
  id,
  position,
  model,
  scale,
  rotation,
  link,
  onOpenModal,
  onAnchorReady,
  onReady,
}: GraphNodeProps) {
  const { scene } = useGLTF(model);
  const router = useRouter();

  const groupRef = useRef<THREE.Group>(null);
  const isHoveredRef = useRef(false);
  const readyOnceRef = useRef(false);

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

  useEffect(() => {
    if (readyOnceRef.current) return;
    readyOnceRef.current = true;
    onReady?.(id);

    const group = groupRef.current;
    if (!group) return;

    group.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(group);
    const center = bounds.getCenter(new THREE.Vector3());
    onAnchorReady?.(id, [center.x, bounds.min.y, center.z]);
  }, [id, onAnchorReady, onReady]);

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
