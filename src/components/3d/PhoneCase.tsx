import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneCaseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  design?: string;
  scale?: number;
}

export function PhoneCase({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  color = '#00A676',
  design = 'WC',
  scale = 1
}: PhoneCaseProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + rotation[1];
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1 + rotation[0];
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Phone case body */}
      <RoundedBox
        ref={meshRef}
        args={[1.2, 2.4, 0.15]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Screen area */}
      <RoundedBox
        position={[0, 0, 0.08]}
        args={[1.05, 2.2, 0.02]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.1}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Camera bump */}
      <RoundedBox
        position={[-0.35, 0.9, -0.1]}
        args={[0.35, 0.45, 0.08]}
        radius={0.04}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#0a0a15"
          roughness={0.2}
          metalness={0.9}
        />
      </RoundedBox>

      {/* Logo text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.2}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/orbitron.woff"
      >
        {design}
      </Text>

      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0.5]}
        color={color}
        intensity={0.5}
        distance={2}
      />
    </group>
  );
}
