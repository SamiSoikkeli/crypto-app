import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { LayerMaterial, Depth, Noise } from 'lamina'
import HeroBackground from './HeroBackground'
import styled from "styled-components"

const HeroWrapper = styled.div`
    height: 90vh;
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Hero = () => {
    function Caption({ children }) {
        const { width } = useThree((state) => state.viewport)
        return (
            <Text
                position={[0.5, 0, -5]}
                lineHeight={0.8}
                letterSpacing={-0.05}
                font="/Inter-Bold.ttf"
                fontSize={width / 8}
                material-toneMapped={false}
                anchorX="right"
                anchorY="middle">
                {children}
            </Text>
        )
    }

    function Rig({ v = new THREE.Vector3() }) {
        return useFrame((state) => {
            state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
        })
    }

    function Bg() {
        return (
            <mesh scale={100}>
                <boxGeometry args={[1, 1, 1]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Depth colorB="red" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
                    <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
                </LayerMaterial>
            </mesh>
        )
    }

    return (
        <HeroWrapper>
            <Canvas style={{ borderRadius: "2rem" }}dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
                <Bg />
                <Suspense fallback={null}>
                    <HeroBackground />
                    <Caption>{`THE\nALL-IN-ONE\nPLACE\nFOR CRYPTO.`}</Caption>
                    <Rig />
                </Suspense>
            </Canvas>
        </HeroWrapper>
    )
}

export default Hero