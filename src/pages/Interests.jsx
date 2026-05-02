import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Interests() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    // In a real scenario, this would fetch from a devices table
    // or aggregate from sensor_readings. For now, mocking based on design.
    setSensors([
      { id: 'ESP32-CORE-01', name: 'Main Weather Tower', status: 'ONLINE', latency: '12ms', type: 'developer_board' },
      { id: 'ESP32-QUAD-02', name: 'Engineering Lawn', status: 'ONLINE', latency: '24ms', type: 'developer_board' },
      { id: 'ESP32-GYM-05', name: 'Sports Complex', status: 'OFFLINE', latency: 'No Signal', type: 'developer_board' },
      { id: 'ESP32-LAB-09', name: 'Physics Dept Roof', status: 'ONLINE', latency: '18ms', type: 'developer_board' },
    ]);
  }, []);

  return (
    <main className="pt-24 pb-32 px-margin max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="mb-gutter">
        <h1 className="font-display-xl text-on-surface mb-2">Interests & Management</h1>
        <p className="font-body-base text-on-surface-variant max-w-2xl">Real-time campus livability metrics and advanced sensor telemetry for the academic research community.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Campus Comfort Index - Gauge */}
        <div className="md:col-span-8 glass-card rounded-xl p-card-padding flex flex-col justify-between min-h-[320px]">
          <div>
            <h2 className="font-header-md text-on-surface mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">thermostat</span>
              Campus Comfort Index
            </h2>
            <p className="text-body-sm text-on-surface-variant">Combined Biometeorological Score</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-8">
            {/* Gauge Visualization */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-variant" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-secondary drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="138.23" strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-display-xl font-bold text-on-surface">74</span>
                <span className="text-label-caps text-secondary uppercase tracking-widest">Optimal</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5">
                <span className="text-label-caps text-on-surface-variant block mb-1">HUMIDITY</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">water_drop</span>
                  <span className="text-header-md">42%</span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5">
                <span className="text-label-caps text-on-surface-variant block mb-1">AIR QUALITY</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">air</span>
                  <span className="text-header-md">12 <small className="text-xs">AQI</small></span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5">
                <span className="text-label-caps text-on-surface-variant block mb-1">UV INDEX</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-sm">sunny</span>
                  <span className="text-header-md">Low</span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5">
                <span className="text-label-caps text-on-surface-variant block mb-1">WIND CHILL</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">ac_unit</span>
                  <span className="text-header-md">18°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Trivia & Fun Facts */}
        <div className="md:col-span-4 glass-card rounded-xl p-card-padding flex flex-col">
          <div className="mb-4">
            <h2 className="font-header-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">lightbulb</span>
              Campus Trivia
            </h2>
          </div>
          <div className="flex-grow flex flex-col justify-center gap-6">
            <div className="relative p-4 rounded-lg bg-tertiary-container/10 border-l-4 border-tertiary">
              <p className="italic text-body-base text-on-surface mb-2">"Did you know? The Engineering Quad experiences a wind-tunnel effect that increases perceived gusts by 15% during peak spring."</p>
              <span className="text-label-caps text-tertiary">— CAMPUS RECORD 2023</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">history</span>
              <div>
                <p className="text-label-caps text-on-surface-variant">HISTORIC LOW</p>
                <p className="text-body-base font-bold">-12.4°C (Jan 15, 1998)</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant dark:border-white/10 flex justify-between items-center">
            <span className="text-label-caps text-on-surface-variant">3 NEW FACTS</span>
            <button className="text-primary text-label-caps hover:underline">NEXT FACT</button>
          </div>
        </div>

        {/* Sensor Health Section */}
        <div className="md:col-span-12 lg:col-span-7 glass-card rounded-xl p-card-padding">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-header-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">sensors</span>
              Sensor Network Telemetry
            </h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">98% Uptime</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sensors.map((sensor) => (
              <div key={sensor.id} className={`flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5 ${sensor.status === 'OFFLINE' ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">{sensor.type}</span>
                  </div>
                  <div>
                    <p className="font-header-md text-sm text-on-surface">{sensor.id}</p>
                    <p className="text-xs text-on-surface-variant">{sensor.name}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 ${sensor.status === 'ONLINE' ? 'text-secondary' : 'text-error'}`}>
                    <span className={`w-2 h-2 rounded-full ${sensor.status === 'ONLINE' ? 'bg-secondary animate-pulse' : 'bg-error'}`}></span>
                    <span className="text-label-caps">{sensor.status}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{sensor.status === 'ONLINE' ? `Lat: ${sensor.latency}` : sensor.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management Section */}
        <div className="md:col-span-12 lg:col-span-5 glass-card rounded-xl p-card-padding">
          <h2 className="font-header-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">database</span>
            Data Management
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-error-container/10 border border-error/20 rounded-lg">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-error">info</span>
                <div>
                  <p className="text-body-base font-bold text-error">Auto-Cleanup Policy</p>
                  <p className="text-body-sm text-on-surface-variant">Notice: Raw high-frequency telemetry is automatically purged every 10 days to optimize storage. Export critical datasets immediately.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-label-caps text-on-surface-variant tracking-widest">EXPORT TOOLS</p>
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-variant/50 border border-outline-variant dark:border-white/10 hover:bg-surface-variant transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">csv</span>
                    <span className="font-body-base">Export last 24h as CSV</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">download</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-variant/50 border border-outline-variant dark:border-white/10 hover:bg-surface-variant transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">table_chart</span>
                    <span className="font-body-base">Export Monthly Summary (PDF)</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">download</span>
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant dark:border-white/10 flex justify-between items-center text-on-surface-variant text-xs">
              <span>Database Size: 24.8 GB</span>
              <span>API Status: Normal</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
