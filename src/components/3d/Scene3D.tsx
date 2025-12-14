import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GlobeScene } from './GlobeScene';
import { FloatingParticles } from './FloatingParticles';
import { PhoneCase } from './PhoneCase';

interface Scene3DProps {
  variant?: 'hero' | 'products' | 'minimal';
  className?: string;
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#00A676" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export function Scene3D({ variant = 'hero', className = '' }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00A676" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#FFD700" />

        <Suspense fallback={<Loader />}>
          {variant === 'hero' && (
            <>
              <GlobeScene />
              <FloatingParticles count={200} color="#00A676" />
              <FloatingParticles count={80} color="#FFD700" size={0.03} />
            </>
          )}

          {variant === 'products' && (
            <>
              <PhoneCase position={[-3, 0, 0]} color="#00A676" design="WC" scale={1.2} />
              <PhoneCase position={[0, 0.5, 1]} color="#FFD700" design="UY" scale={1.3} />
              <PhoneCase position={[3, -0.5, -1]} color="#00A676" design="25" scale={1.1} />
              <FloatingParticles count={100} color="#00A676" size={0.015} />
            </>
          )}

          {variant === 'minimal' && (
            <>
              <PhoneCase position={[0, 0, 0]} color="#00A676" design="WC" scale={1.5} />
              <FloatingParticles count={80} color="#00A676" size={0.02} />
            </>
          )}
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
