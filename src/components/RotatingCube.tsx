import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Cube() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
    ref.current.rotation.z += 0.01
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[3, 3, 3]} />
      <meshBasicMaterial wireframe color="red"/>
    </mesh>
  )
}

function RotatingCube(){
    return (
        <Canvas>
            <Cube/>
        </Canvas>
    );
}

export default RotatingCube;
