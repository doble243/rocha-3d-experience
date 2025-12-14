import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function GlobeScene() {
  const globeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.001;
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.05);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <Sphere
        ref={glowRef}
        args={[2.2, 32, 32]}
      >
        <meshBasicMaterial
          color="#00A676"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main globe */}
      <Sphere
        ref={globeRef}
        args={[2, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color="#0a2540"
          roughness={0.4}
          metalness={0.8}
          distort={hovered ? 0.3 : 0.2}
          speed={2}
        />
      </Sphere>

      {/* Grid lines */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#00A676"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Uruguay marker */}
      <mesh position={[-0.8, -1.5, 1.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Marker glow */}
      <pointLight
        position={[-0.8, -1.5, 1.4]}
        color="#FFD700"
        intensity={2}
        distance={1}
      />
    </group>
  );
}
