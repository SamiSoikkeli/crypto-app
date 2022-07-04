import * as THREE from 'three'
import { useState, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import { LayerMaterial, Color, Depth, Fresnel, Noise } from 'lamina/vanilla'

const colorA = new THREE.Color('#2032A5').convertSRGBToLinear()
const colorB = new THREE.Color('#0F1C4D').convertSRGBToLinear()
const fresnel = new THREE.Color('#E7B473').convertSRGBToLinear()
const material = new LayerMaterial({
    layers: [
        new Color({ color: colorA }),
        new Depth({ colorA: colorA, colorB: colorB, alpha: 0.5, mode: 'normal', near: 0, far: 2, origin: [1, 1, 1] }),
        new Depth({ colorA: 'purple', colorB: colorB, alpha: 0.5, mode: 'add', near: 3, far: 2, origin: [1, 1, 1] }),
        new Fresnel({ mode: 'add', color: fresnel, intensity: 0.3, power: 2.5, bias: 0.0 }),
        new Noise({ mapping: 'local', type: 'simplex', scale: 1000, colorA: '#ffaf40', colorB: 'black', mode: 'overlay' })
    ]
})

function Tulip({ ...props }) {
    const { viewport, camera } = useThree()
    const group = useRef();
    const { nodes } = useGLTF("/tulip.glb");
    const [speed] = useState(() => 0.1 + Math.random() / 10)
    const position = useMemo(() => {
        const z = Math.random() * -30
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
        return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewport])
    return (
        <Float position={position} speed={speed} rotationIntensity={10} floatIntensity={40} ref={group} {...props} dispose={null}>
        <mesh
            scale={1}
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={material}
            position={[-0.79, -6.48, 0.04]}
            rotation={[-0.07, -0.03, 0.43]}
        />
        </Float>
    );
}

const HeroBackground = () => {
    return (
        Array.from({ length: 5 }, (_, i) => <Tulip key={i} />)
    )
}

export default HeroBackground

useGLTF.preload('/Tulip.glb')
