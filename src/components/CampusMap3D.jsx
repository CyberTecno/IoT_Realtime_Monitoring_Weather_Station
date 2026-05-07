import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html } from '@react-three/drei';

function WindParticles({ windSpeed, windDir }) {
  const count = 300;
  const meshRef = useRef();
  
  const [positions, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12; // x
      positions[i * 3 + 1] = Math.random() * 4; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12; // z
      scales[i] = Math.random();
    }
    return [positions, scales];
  }, [count]);

  const windVector = useMemo(() => {
    const dirMap = {
      'N': [0, 1], 'NE': [-0.707, 0.707], 'E': [-1, 0], 'SE': [-0.707, -0.707],
      'S': [0, -1], 'SW': [0.707, -0.707], 'W': [1, 0], 'NW': [1, 0.707]
    };
    return dirMap[windDir] || [1, 0];
  }, [windDir]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array;
    // Map real wind speed (km/h) to particle speed. e.g., 14km/h -> reasonable float speed
    const speed = (windSpeed || 10) * 0.2; 
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += windVector[0] * speed * delta; // x
      positions[i * 3 + 2] += windVector[1] * speed * delta; // z
      
      // Loop around
      if (positions[i * 3] > 6) positions[i * 3] -= 12;
      if (positions[i * 3] < -6) positions[i * 3] += 12;
      if (positions[i * 3 + 2] > 6) positions[i * 3 + 2] -= 12;
      if (positions[i * 3 + 2] < -6) positions[i * 3 + 2] += 12;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#4cd7f6" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
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
        
        <WindParticles windSpeed={windSpeed} windDir={windDir} />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Island />
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
