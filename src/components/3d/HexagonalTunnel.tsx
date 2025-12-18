import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HexagonRingProps {
  radius: number;
  z: number;
  opacity: number;
  rotationOffset: number;
}

function HexagonRing({ radius, z, opacity, rotationOffset }: HexagonRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const angleStep = (Math.PI * 2) / sides;
    
    for (let i = 0; i <= sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    
    // Create inner hole
    const holeRadius = radius * 0.92;
    const hole = new THREE.Path();
    for (let i = 0; i <= sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = Math.cos(angle) * holeRadius;
      const y = Math.sin(angle) * holeRadius;
      
      if (i === 0) {
        hole.moveTo(x, y);
      } else {
        hole.lineTo(x, y);
      }
    }
    shape.holes.push(hole);
    
    return new THREE.ShapeGeometry(shape);
  }, [radius]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotationOffset + state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, z]} geometry={geometry}>
      <meshBasicMaterial 
        color="#00aa77"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface HexagonalTunnelProps {
  scrollProgress?: number;
}

export function HexagonalTunnel({ scrollProgress = 0 }: HexagonalTunnelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate tunnel rings
  const rings = useMemo(() => {
    const tunnelRings = [];
    const ringCount = 40;
    const baseZ = -60;
    const spacing = 2.5;
    
    for (let i = 0; i < ringCount; i++) {
      const z = baseZ + i * spacing;
      const distance = Math.abs(z);
      const radius = 3 + (distance * 0.08);
      const opacity = Math.max(0.05, 0.4 - (distance * 0.005));
      const rotationOffset = i * 0.1;
      
      tunnelRings.push({
        id: i,
        radius,
        z,
        opacity,
        rotationOffset
      });
    }
    
    return tunnelRings;
  }, []);

  // Ambient particles
  const particles = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    const opacities = new Float32Array(300);
    
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 4;
      const z = -Math.random() * 80;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;
      opacities[i] = 0.1 + Math.random() * 0.4;
    }
    
    return { positions, opacities };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing effect
      const breathe = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      groupRef.current.scale.setScalar(1 + breathe);
      
      // Scroll-based depth movement
      groupRef.current.position.z = scrollProgress * 20;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Hexagonal rings */}
      {rings.map((ring) => (
        <HexagonRing
          key={ring.id}
          radius={ring.radius}
          z={ring.z}
          opacity={ring.opacity}
          rotationOffset={ring.rotationOffset}
        />
      ))}
      
      {/* Ambient particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00aa77"
          size={0.03}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      
      {/* Central glow */}
      <mesh position={[0, 0, -40]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#00ffaa" transparent opacity={0.15} />
      </mesh>
      
      {/* Secondary glow ring */}
      <mesh position={[0, 0, -35]}>
        <ringGeometry args={[0.8, 1.2, 6]} />
        <meshBasicMaterial color="#00aa77" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
