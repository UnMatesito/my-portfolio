import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Torus() {
    const ref = useRef<THREE.Mesh>(null!)

    useFrame(() => {
        ref.current.rotation.x += -0.005
        ref.current.rotation.y += -0.005
        ref.current.rotation.z += -0.005
    })

    return (
        <mesh ref={ref}>
            <torusGeometry args={[5, 2, 10, 15]} />
            <meshBasicMaterial wireframe color="red"/>
        </mesh>
    )
}

function RotatingTorus() {
    return (
        <Canvas>
            <Torus/>
        </Canvas>
    )
}

export default RotatingTorus;