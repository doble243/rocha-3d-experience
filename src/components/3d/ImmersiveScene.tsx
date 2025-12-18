import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { HexagonalTunnel } from './HexagonalTunnel';
import * as THREE from 'three';

interface AmbientLightingProps {
  scrollProgress: number;
}

function AmbientLighting({ scrollProgress }: AmbientLightingProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Subtle pulsing
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.9;
      lightRef.current.intensity = 0.3 * pulse;
    }
  });

  return (
    <>
      <ambientLight intensity={0.08} color="#112233" />
      <pointLight 
        ref={lightRef}
        position={[0, 0, -10]} 
        intensity={0.3} 
        color="#00aa77"
        distance={50}
        decay={2}
      />
      <pointLight 
        position={[5, 5, -5]} 
        intensity={0.1} 
        color="#ddaa44"
        distance={30}
        decay={2}
      />
      <pointLight 
        position={[-5, -3, -8]} 
        intensity={0.08} 
        color="#0066aa"
        distance={25}
        decay={2}
      />
    </>
  );
}

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    if (cameraRef.current) {
      // Subtle camera sway for organic feel
      const swayX = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      const swayY = Math.cos(state.clock.elapsedTime * 0.15) * 0.03;
      
      cameraRef.current.position.x = swayX;
      cameraRef.current.position.y = swayY;
      
      // Depth based on scroll
      cameraRef.current.position.z = 5 - scrollProgress * 2;
      
      // Look slightly into the tunnel
      cameraRef.current.lookAt(0, 0, -20);
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      position={[0, 0, 5]} 
      fov={60}
      near={0.1}
      far={200}
    />
  );
}

interface ImmersiveSceneProps {
  scrollProgress?: number;
  className?: string;
}

export function ImmersiveScene({ scrollProgress = 0, className = '' }: ImmersiveSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <CameraController scrollProgress={scrollProgress} />
        <AmbientLighting scrollProgress={scrollProgress} />
        
        <Suspense fallback={null}>
          <HexagonalTunnel scrollProgress={scrollProgress} />
        </Suspense>
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0f14', 10, 80]} />
      </Canvas>
    </div>
  );
}
