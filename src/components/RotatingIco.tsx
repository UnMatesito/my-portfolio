import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Ico() {
    const ref = useRef<THREE.Mesh>(null!)

    useFrame(() => {
        ref.current.rotation.x += 0.005
        ref.current.rotation.y += 0.01
        ref.current.rotation.z += 0.015
    })

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[3, 1]} />
            <meshBasicMaterial wireframe color="red"/>
        </mesh>
    )
}

function RotatingIco() {
    return (
        <Canvas className='hidden lg:block'>
            <Ico />
        </Canvas>
    );
}

export default RotatingIco;