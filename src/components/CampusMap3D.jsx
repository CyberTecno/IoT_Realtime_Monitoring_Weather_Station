import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html } from '@react-three/drei';

function WindLines({ windSpeed, windDir }) {
  const count = 150;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const windVector = useMemo(() => {
    const dirMap = {
      'N': [0, 1], 'NE': [-0.707, 0.707], 'E': [-1, 0], 'SE': [-0.707, -0.707],
      'S': [0, -1], 'SW': [0.707, -0.707], 'W': [1, 0], 'NW': [1, 0.707]
    };
    return dirMap[windDir] || [1, 0];
  }, [windDir]);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      yBase: Math.random() * 4,
      z: (Math.random() - 0.5) * 12,
      speedFactor: 0.5 + Math.random() * 0.8,
      length: 0.4 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const speed = (windSpeed || 10) * 0.4;
    const angle = Math.atan2(windVector[0], windVector[1]);
    const time = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      // Move along wind direction
      p.x += windVector[0] * speed * p.speedFactor * delta;
      p.z += windVector[1] * speed * p.speedFactor * delta;
      
      // Winding effect (beliuk-liuk)
      const y = p.yBase + Math.sin(time * 2 + p.phase) * 0.2;
      const swayAngle = angle + Math.sin(time * 3 + p.phase) * 0.1;

      // Loop around
      if (p.x > 6) p.x -= 12;
      if (p.x < -6) p.x += 12;
      if (p.z > 6) p.z -= 12;
      if (p.z < -6) p.z += 12;

      dummy.position.set(p.x, y, p.z);
      dummy.rotation.set(0, swayAngle, 0);
      dummy.scale.set(0.015, 0.015, p.length);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry />
      <meshBasicMaterial color="#4cd7f6" transparent opacity={0.3} depthWrite={false} />
    </instancedMesh>
  );
}

function Island() {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={meshRef}>
      {/* Floating Base */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[4, 3, 1, 64]} />
        <meshStandardMaterial color="#191b23" transparent opacity={0.8} />
      </mesh>
      
      {/* Grid Lines */}
      <gridHelper args={[8, 16, '#4cd7f6', '#adc6ff']} position={[0, 0.01, 0]} />

      {/* Campus Buildings / Nodes */}
      <mesh position={[-1, 0.25, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#adc6ff" />
      </mesh>
      <mesh position={[1.5, 0.4, 0.5]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#adc6ff" />
      </mesh>
      <mesh position={[0, 0.3, 1.5]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#adc6ff" />
      </mesh>

      {/* Station Marker */}
      <Html position={[-1, 1, -1]} center className="pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md border border-primary dark:border-cyan-400 p-2 rounded text-[10px] text-on-surface dark:text-white whitespace-nowrap">
          <p className="font-bold">BSD STATION</p>
          <p className="text-primary dark:text-cyan-400">Active Scan</p>
        </div>
      </Html>
      
      {/* Anomaly Marker */}
      <Html position={[1.5, 1.2, 0.5]} center className="pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md border border-tertiary p-2 rounded text-[10px] text-on-surface dark:text-white whitespace-nowrap">
          <p className="font-bold text-tertiary">PACIFIC ANOMALY</p>
          <p className="text-on-surface-variant dark:text-slate-300">Pressure Low</p>
        </div>
      </Html>
    </group>
  );
}

export default function CampusMap3D({ windSpeed = 10, windDir = 'W' }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950/50">
      <Canvas shadows camera={{ position: [0, 4, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4cd7f6" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffb786" />
        
        <WindLines windSpeed={windSpeed} windDir={windDir} />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Island />
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
