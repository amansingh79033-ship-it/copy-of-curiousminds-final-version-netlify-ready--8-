
// @ts-nocheck
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { LuminousMode } from '../types';

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const ParticleField = ({ mode }: { mode: LuminousMode }) => {
  const mesh = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.PointsMaterial>(null!);
  const { pointer, viewport } = useThree();
  const count = 6000; // Increased density
  
  // Track scroll for parallax
  const scrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Create a more spherical/volumetric distribution
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      color.set(Math.random() > 0.5 ? '#22d3ee' : '#3b82f6');
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      sz[i] = Math.random();
    }
    return [pos, col, sz];
  }, []);

  const initialPositions = useMemo(() => new Float32Array(positions), [positions]);

  useEffect(() => {
    if (!matRef.current) return;
    let targetSize = 0.08;
    let targetOpacity = 0.4;

    if (mode === 'NIGHT') { targetSize = 0.15; targetOpacity = 0.6; }
    else if (mode === 'SOOTHING') { targetSize = 0.25; targetOpacity = 0.8; }
    else if (mode === 'BRIGHT') { targetSize = 0.35; targetOpacity = 1.0; }

    gsap.to(matRef.current, {
      size: targetSize,
      opacity: targetOpacity,
      duration: 1.5,
      ease: 'expo.out'
    });
  }, [mode]);

  useFrame((state) => {
    const { clock } = state;
    const time = clock.getElapsedTime();
    
    // Smooth Parallax from Scroll
    const targetScrollY = scrollY.current * 0.015;
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetScrollY, 0.05);

    // Dynamic Rotation following cursor and time
    const targetRotX = -pointer.y * 0.2;
    const targetRotY = pointer.x * 0.2 + time * 0.05;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotX, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, 0.05);

    // Subtle breathing scale
    const breath = Math.sin(time * 0.5) * 0.05 + 1;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, breath, 0.1));

    // Per-particle micro-movement (only if mode is not OFF for performance, but user wants it immersive)
    const positionsArray = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Add subtle wave effect based on time and initial position
      const wave = Math.sin(time + initialPositions[i3]) * 0.02;
      positionsArray[i3 + 1] = initialPositions[i3 + 1] + wave;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          ref={matRef}
          size={0.08}
          vertexColors 
          transparent 
          opacity={0.4} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </points>
    </group>
  );
};

const BackgroundEffects = ({ mode }: { mode: LuminousMode }) => {
  return (
    <>
      <Stars 
        radius={150} 
        depth={100} 
        count={mode === 'OFF' ? 3000 : 1000} 
        factor={6} 
        saturation={0} 
        fade 
        speed={1.5} 
      />
      <ParticleField mode={mode} />
      
      {/* Dynamic light following cursor for extra depth */}
      <CursorLight />
    </>
  );
};

const CursorLight = () => {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { pointer, viewport } = useThree();

  useFrame(() => {
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 5);
  });

  return <pointLight ref={lightRef} intensity={0.8} color="#22d3ee" distance={20} decay={2} />;
};

const ThreeBackground: React.FC<{ mode?: LuminousMode }> = ({ mode = 'OFF' }) => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (!webGLSupported) {
    return <div className="fixed inset-0 z-0 bg-[#050505]" />;
  }

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ${mode !== 'OFF' ? 'bg-black' : 'bg-transparent'}`}>
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 45 }} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <BackgroundEffects mode={mode} />
      </Canvas>
      
      {/* Vignette/Depth overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${mode !== 'OFF' ? 'bg-black/40' : 'bg-transparent'}`} />
    </div>
  );
};

export default ThreeBackground;
