'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader material for advanced effects
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create animated noise pattern
    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;
    
    // Mix colors based on noise and position
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);
    
    // Add glow effect
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = max(0.0, glow); // Fix for negative base in pow
    glow = pow(glow, 2.0);
    
    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`;

export function ShaderPlane({
    position,
    color1 = '#ff5722',
    color2 = '#ffffff',
}: {
    position: [number, number, number];
    color1?: string;
    color2?: string;
}) {
    const mesh = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            intensity: { value: 1.0 },
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) },
        }),
        [color1, color2]
    );

    useFrame((state) => {
        if (mesh.current) {
            // @ts-expect-error: Threejs uniform types are dynamic
            mesh.current.material.uniforms.time.value = state.clock.elapsedTime;
            // @ts-expect-error: Threejs uniform types are dynamic
            mesh.current.material.uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <mesh ref={mesh} position={position}>
            <planeGeometry args={[8, 8, 32, 32]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export function EnergyRing({
    radius = 1,
    position = [0, 0, 0],
}: {
    radius?: number;
    position?: [number, number, number];
}) {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.z = state.clock.elapsedTime;
            // @ts-expect-error: Material type intersection issue
            mesh.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
        }
    });

    return (
        <mesh ref={mesh} position={position}>
            <ringGeometry args={[radius * 0.8, radius, 32]} />
            <meshBasicMaterial color="#ff5722" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
    );
}

// Wrapper for usage in PremiumBoxesSection
export default function BackgroundPaperShaders({ color1, color2 }: { color1?: string; color2?: string }) {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            {/* 
         Camera Z is set to 2. Plane geometry 8x8 should cover view. 
         ShaderPlane is rendered at [0,0,0].
      */}
            <Canvas camera={{ position: [0, 0, 2] }} gl={{ alpha: true, antialias: true }}>
                <ShaderPlane position={[0, 0, 0]} color1={color1} color2={color2} />
            </Canvas>
        </div>
    );
}
