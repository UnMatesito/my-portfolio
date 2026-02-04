export default function GraphNode({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#ff7a00" />
    </mesh>
  );
}
