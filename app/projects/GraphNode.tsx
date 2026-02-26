import { useGLTF } from "@react-three/drei";

type GraphNodeProps = {
  position: [number, number, number];
  model: string;
  scale?: [number, number, number];
};

export default function GraphNode({ position, model, scale }: GraphNodeProps) {
  const { scene } = useGLTF(model);

  return (
    <group position={position}>
      <primitive object={scene.clone()} scale={scale} />
    </group>
  );
}