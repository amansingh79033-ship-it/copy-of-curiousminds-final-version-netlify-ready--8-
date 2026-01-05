
// @ts-nocheck
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { UserProfile } from '../types';

interface LiveGlobeProps {
  activeUsers: UserProfile[];
  onUserClick?: (user: UserProfile) => void;
}

// Convert Lat/Lng to Vector3 components
const latLngToCoords = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return [x, y, z] as [number, number, number];
};

const GlobeMesh = ({ users, onUserClick }: { users: UserProfile[], onUserClick?: (user: UserProfile) => void }) => {
  const globeRef = useRef<THREE.Group>(null);
  const [hoveredUser, setHoveredUser] = useState<UserProfile | null>(null);

  useFrame((state) => {
    if (globeRef.current && !hoveredUser) {
      globeRef.current.rotation.y += 0.001; // Auto rotate unless hovering
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base Sphere (Dark Ocean) */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.7} 
          metalness={0.2}
          emissive="#001133"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Wireframe overlay for "Sci-Fi" look */}
      <mesh>
        <sphereGeometry args={[5.01, 32, 32]} />
        <meshBasicMaterial 
          color="#1e293b" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial 
          color="#22d3ee" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide}
        />
      </mesh>

      {/* User Traffic Dots */}
      {users.map((user) => {
        if (!user.location) return null;
        const pos = latLngToCoords(user.location.lat, user.location.lng, 5.05);
        const isHovered = hoveredUser?.id === user.id;
        
        return (
          <group key={user.id} position={pos}>
            {/* The Dot with Interactive scale/glow */}
            <mesh 
              onPointerOver={() => setHoveredUser(user)}
              onPointerOut={() => setHoveredUser(null)}
              onClick={(e) => {
                e.stopPropagation();
                onUserClick?.(user);
              }}
              scale={isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial 
                color={user.isBlocked ? "#ef4444" : isHovered ? "#fff" : "#22d3ee"} 
                toneMapped={false}
              />
            </mesh>
            
            {/* Pulse Ring (Visual only) */}
            <mesh scale={isHovered ? [1.8, 1.8, 1.8] : [1, 1, 1]}>
               <ringGeometry args={[0.15, 0.22, 32]} />
               <meshBasicMaterial color={user.isBlocked ? "#ef4444" : "#22d3ee"} transparent opacity={isHovered ? 0.9 : 0.4} side={THREE.DoubleSide} />
            </mesh>

            {/* Pillar beam sticking out */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, isHovered ? 0.8 : 0.5, 8]} />
                <meshBasicMaterial color={user.isBlocked ? "#ef4444" : "#22d3ee"} transparent opacity={isHovered ? 0.8 : 0.3} />
            </mesh>

            {/* Hover Tooltip */}
            {isHovered && (
              <Html distanceFactor={15}>
                <div className="bg-black/95 border border-cyan-500/50 p-4 rounded-xl min-w-[220px] text-white backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.3)] transform -translate-x-1/2 -translate-y-full mt-[-25px] pointer-events-none animate-in zoom-in-90 duration-200">
                   <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                      <span className="text-xl">{user.location.flag}</span>
                      <div>
                         <p className="font-black text-xs uppercase tracking-tight">{user.location.city}, {user.location.country}</p>
                         <p className="text-[9px] text-gray-500 font-mono">{user.ip}</p>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs font-black text-cyan-400 uppercase italic">{user.name}</div>
                      <div className="text-[8px] text-gray-400 mt-1 uppercase tracking-widest bg-cyan-500/10 px-2 py-1 rounded inline-block">Click to Audit Live View</div>
                   </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

const LiveGlobe: React.FC<LiveGlobeProps> = ({ activeUsers, onUserClick }) => {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#020202] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 cursor-crosshair">
      
      <div className="absolute top-6 left-6 z-10">
         <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <h3 className="text-white font-black tracking-widest text-[10px] uppercase italic">
              Neural Traffic Cluster // LIVE
            </h3>
         </div>
         <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">Global Node Visibility Active</p>
      </div>

      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#purple" />
        
        <GlobeMesh users={activeUsers} onUserClick={onUserClick} />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={8} 
          maxDistance={20} 
          autoRotate={false}
        />
      </Canvas>
      
      {/* Footer Stats on the visualizer */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
         <div className="space-y-1">
            <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Active Signatures</div>
            <div className="text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] italic">{activeUsers.length}</div>
         </div>
         <div className="text-[9px] text-gray-700 font-black font-mono text-right uppercase tracking-widest leading-relaxed">
            Network Integrity: OPTIMAL <br/>
            Region: CLUSTER_MUMBAI_HUB
         </div>
      </div>
    </div>
  );
};

export default LiveGlobe;
