import React, { useState } from 'react';
import CampusMap3D from '../components/CampusMap3D';
import { useTelemetry } from '../hooks/useTelemetry';

export default function Summary() {
  const { reading, vibration } = useTelemetry();
  const [viewMode, setViewMode] = useState('wind'); // 'wind' or 'satellite'

  // Fallback to static values if no data is available yet
  const temp = reading?.temp_bme?.toFixed(1) || '24.5';
  const humidity = reading?.hum_bme?.toFixed(0) || '42';
  const pressure = reading?.pressure?.toFixed(1) || '1012.4';
  const windSpeed = reading?.wind_speed?.toFixed(1) || '14';
  const windDir = reading?.wind_direction || 'NE';
  const aqi = reading?.pm2_5 ? Math.round(reading.pm2_5 * 2) : 42; // rough aqi calc
  const pm25 = reading?.pm2_5?.toFixed(1) || '12.4';
  
  const vibStatus = vibration?.status || 'No major activity detected';
  const isVibAlert = vibration?.vibration_intensity > 5;

  return (
    <main className="pt-24 px-gutter pb-margin">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Bento Grid Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-gutter">
          
          {/* Main Telemetry Hero */}
          <div className="col-span-12 lg:col-span-8 h-[400px] rounded-xl glass overflow-hidden relative group">
            <div className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-700 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=80')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-cyan-400 text-on-secondary-fixed text-label-caps rounded-full font-bold">LIVE TELEMETRY</span>
                  <span className="text-slate-400 text-label-caps">STATION PMU-01 • BSD CAMPUS</span>
                </div>
                <h1 className="font-display-xl text-white mb-2">{temp}°C</h1>
                <p className="text-slate-300 font-header-md">Partly Cloudy • Feels like {Number(temp) + 2.5}°C</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-label-caps text-slate-500 mb-1">HUMIDITY</p>
                  <p className="font-data-mono text-cyan-400 text-header-md">{humidity}%</p>
                </div>
                <div className="text-right">
                  <p className="text-label-caps text-slate-500 mb-1">DEW POINT</p>
                  <p className="font-data-mono text-cyan-400 text-header-md">19°C</p>
                </div>
              </div>
            </div>
          </div>

          {/* Air Quality Index Card */}
          <div className="col-span-12 lg:col-span-4 h-[400px] rounded-xl glass p-card-padding flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa2eXLCI5xCCO1Yt-ESZOe1ep3E0W78630h0uBApEJUO0OXC0mNFOIXiruhDoG-srwdTSpnL3WXRN8bIonjBGGqHnvGk37ISguTzNR6Q9AYgo19lbJIpX1T5y2XU6dRSPawYpqnlM1v3zwH4y0PsbRirLPbG1r8vJxjyEeQzcPrYPA-IFTAgtEUGNwyOwEfadW-C9KeMtFnuhrhdNy30xLJEIjgha1d1wXtIDXt9HoAxRXynbeacZTAMlZdd5WHnelBfjfx6YcXJY')] bg-cover bg-center"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-header-md text-white">Air Quality</h3>
                  <p className="text-body-sm text-slate-400">Atmospheric Pollutants</p>
                </div>
                <span className="material-symbols-outlined text-cyan-400">air</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="gauge-container mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle className="gauge-ring" cx="60" cy="60" r="50"></circle>
                    <circle className="gauge-progress" cx="60" cy="60" r="50"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                    <span className="font-display-lg text-white">{aqi}</span>
                    <span className="text-label-caps text-cyan-400">AQI</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-header-md text-white mb-1">{aqi < 50 ? 'Good Condition' : aqi < 100 ? 'Moderate' : 'Unhealthy'}</p>
                  <p className="text-body-sm text-slate-400">PM2.5: {pm25} µg/m³</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-[10px] text-slate-500 font-bold mb-1">PM1.0</p>
                  <p className="text-xs font-data-mono text-white">{reading?.pm1_0 || '8.2'}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-[10px] text-slate-500 font-bold mb-1">PM2.5</p>
                  <p className="text-xs font-data-mono text-white">{pm25}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-[10px] text-slate-500 font-bold mb-1">PM10</p>
                  <p className="text-xs font-data-mono text-white">{reading?.pm10 || '15.5'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-gutter">
          {/* Wind Stats */}
          <div className="rounded-xl glass p-card-padding">
            <div className="flex justify-between items-center mb-6">
              <span className="text-label-caps text-slate-400">WIND DYNAMICS</span>
              <span className="material-symbols-outlined text-cyan-400">navigation</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center relative">
                <div className="w-1 h-8 bg-cyan-400 rounded-full origin-bottom -translate-y-4 rotate-45 transition-transform duration-500" style={{ transform: `translateY(-16px) rotate(${windDir === 'N' ? 0 : windDir === 'NE' ? 45 : windDir === 'E' ? 90 : windDir === 'SE' ? 135 : windDir === 'S' ? 180 : windDir === 'SW' ? 225 : windDir === 'W' ? 270 : 315}deg)` }}></div>
                <span className="absolute top-1 text-[10px] font-bold">N</span>
              </div>
              <div>
                <p className="font-display-lg text-white">{windSpeed} <span className="text-body-base text-slate-400">km/h</span></p>
                <p className="text-body-sm text-slate-400">Direction: {windDir}</p>
              </div>
            </div>
          </div>
          
          {/* Light & Pressure */}
          <div className="rounded-xl glass p-card-padding">
            <div className="flex justify-between items-center mb-6">
              <span className="text-label-caps text-slate-400">LIGHT & PRESSURE</span>
              <span className="material-symbols-outlined text-cyan-400">light_mode</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-body-sm text-slate-300">UV Index</span>
                <span className="px-3 py-1 bg-tertiary-container/30 text-tertiary-fixed text-xs rounded-full font-bold">Moderate 4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body-sm text-slate-300">Pressure</span>
                <span className="font-data-mono text-white">{pressure} hPa</span>
              </div>
            </div>
          </div>
          
          {/* Seismic Awareness */}
          <div className="rounded-xl glass p-card-padding">
            <div className="flex justify-between items-center mb-6">
              <span className="text-label-caps text-slate-400">SEISMIC AWARENESS</span>
              <span className="material-symbols-outlined text-error">vibration</span>
            </div>
            <div className="flex items-end gap-2 h-16">
              <div className="w-full h-4 bg-white/10 rounded-sm relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-cyan-400 to-transparent opacity-50"></div>
              </div>
              <div className="w-full h-8 bg-white/10 rounded-sm"></div>
              <div className="w-full h-12 bg-white/10 rounded-sm"></div>
              <div className="w-full h-6 bg-white/10 rounded-sm"></div>
              <div className="w-full h-10 bg-white/10 rounded-sm"></div>
              <div className={`w-full h-14 ${isVibAlert ? 'bg-error/40 border-t border-error' : 'bg-cyan-400/20 border-t border-cyan-400'} rounded-sm`}></div>
            </div>
            <p className={`text-[10px] font-bold mt-4 uppercase ${isVibAlert ? 'text-error' : 'text-slate-500'}`}>Status: {vibStatus}</p>
          </div>
        </div>

        {/* Global Environmental Live View (3D Map) */}
        <section className="rounded-xl glass p-card-padding relative overflow-hidden min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="font-display-lg text-white">Global Environmental Live View</h2>
              <p className="text-body-sm text-slate-400">Prasetiya Mulya University (-6.3003, 106.6399)</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('satellite')}
                className={`${viewMode === 'satellite' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'glass hover:bg-white/10 text-white'} px-4 py-2 rounded-lg text-xs font-bold transition-all`}>
                SATELLITE
              </button>
              <button 
                onClick={() => setViewMode('wind')}
                className={`${viewMode === 'wind' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'glass hover:bg-white/10 text-white'} px-4 py-2 rounded-lg text-xs font-bold transition-all`}>
                WIND FLOW
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative rounded-xl overflow-hidden bg-slate-950">
            {viewMode === 'wind' ? (
              <CampusMap3D />
            ) : (
              <iframe 
                width="100%" 
                height="100%" 
                className="absolute inset-0"
                src="https://maps.google.com/maps?q=-6.300355669561905,106.63995990229111&t=k&z=17&ie=UTF8&iwloc=&output=embed" 
                frameBorder="0" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                aria-hidden="false" 
                tabIndex="0">
              </iframe>
            )}
            
            {/* Weather Legend */}
            <div className="absolute bottom-6 left-6 glass p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gradient-to-r from-blue-900 via-cyan-400 to-tertiary rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-400">-50°C to +50°C</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="text-[10px] font-bold text-slate-300">STATION FEED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-[10px] font-bold text-slate-300">STORM TRACK</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
