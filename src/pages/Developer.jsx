import React from 'react';

export default function Developer() {
  return (
    <main className="pt-24 px-gutter pb-8 min-h-screen flex flex-col">
      <div className="max-w-[1200px] mx-auto w-full flex-1">
        
        {/* Profiles Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-16">
          
          {/* Kevin Prasetiya */}
          <div className="rounded-2xl glass p-8 relative overflow-hidden group">
            {/* Glowing background effect */}
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-400/30 transition-all duration-500"></div>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center relative z-10">
              {/* Avatar with Ring */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 animate-spin-slow opacity-50 blur-sm"></div>
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400/50 p-1 relative z-10 bg-background overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop" 
                    alt="Kevin Prasetiya" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block px-3 py-1 bg-cyan-900/40 border border-cyan-700/50 rounded-full text-[10px] font-bold text-cyan-400 tracking-wider mb-4 uppercase">
                  Project Lead
                </div>
                <h2 className="text-3xl font-display-lg text-white mb-2">Kevin Prasetiya</h2>
                <p className="text-cyan-400 font-medium text-sm mb-4">Lead Developer / Research Student</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Specializing in the intersection of IoT and environmental data science. Research focuses on building resilient, real-time monitoring systems bridging hardware and high-fidelity UIs.
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    GitHub
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">work</span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hansen Vincentius */}
          <div className="rounded-2xl glass p-8 relative overflow-hidden group">
            {/* Glowing background effect */}
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-400/30 transition-all duration-500"></div>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center relative z-10">
              {/* Avatar with Ring */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 animate-spin-slow opacity-50 blur-sm"></div>
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400/50 p-1 relative z-10 bg-background overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=400&auto=format&fit=crop" 
                    alt="Hansen Vincentius" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block px-3 py-1 bg-cyan-900/40 border border-cyan-700/50 rounded-full text-[10px] font-bold text-cyan-400 tracking-wider mb-4 uppercase">
                  Project Lead
                </div>
                <h2 className="text-3xl font-display-lg text-white mb-2">Hansen Vincentius</h2>
                <p className="text-cyan-400 font-medium text-sm mb-4">Lead Hardware Engineer / Research Student</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Expert in IoT sensor integration and ESP32 firmware development. Focuses on low-power sensor networks and robust data acquisition for environmental monitoring.
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    GitHub
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">work</span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Technical Ecosystem Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-display-lg text-white mb-6">Technical Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Next.js (Wait, user's image says Next.js but current project is Vite React, I'll use Next.js as shown in image) */}
            <div className="glass rounded-xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-cyan-400">code_blocks</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Next.js</h3>
              <p className="text-sm text-slate-400">App Router architecture for optimized server-side rendering and routing.</p>
            </div>

            {/* Supabase */}
            <div className="glass rounded-xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-cyan-400">database</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Supabase</h3>
              <p className="text-sm text-slate-400">Real-time PostgreSQL database with immediate data broadcast capabilities.</p>
            </div>

            {/* Chart.js */}
            <div className="glass rounded-xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-cyan-400">monitoring</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Chart.js</h3>
              <p className="text-sm text-slate-400">Performant data visualization for high-density weather telemetry.</p>
            </div>

            {/* ESP32 */}
            <div className="glass rounded-xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-cyan-400">memory</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ESP32</h3>
              <p className="text-sm text-slate-400">Hardware core for data acquisition from diverse campus sensors.</p>
            </div>

          </div>
        </div>

        {/* System Architecture Section */}
        <div className="mb-20">
          <div className="glass rounded-2xl p-10 text-center relative overflow-hidden">
            <h2 className="text-3xl font-display-lg text-white mb-4 relative z-10">System Architecture</h2>
            <p className="text-slate-400 mb-16 relative z-10">Real-time data flow from physical sensors to your screen</p>
            
            {/* Architecture Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto relative z-10">
              
              {/* Sensor Node */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center border-white/20 mb-4 shadow-lg shadow-black/50">
                  <span className="material-symbols-outlined text-cyan-400 text-4xl">sensors</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">Campus Sensors</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative">
                  <span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px]">chevron_right</span>
                </div>
              </div>
              <div className="md:hidden w-[1px] h-10 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent relative">
                 <span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] rotate-90">chevron_right</span>
              </div>

              {/* ESP32 Node */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center border-white/20 mb-4 shadow-lg shadow-black/50">
                  <span className="material-symbols-outlined text-cyan-400 text-4xl">memory</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">ESP32 Controller</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative">
                  <span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px]">chevron_right</span>
                </div>
              </div>
              <div className="md:hidden w-[1px] h-10 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent relative">
                 <span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] rotate-90">chevron_right</span>
              </div>

              {/* Supabase Node */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-pulse"></div>
                  <div className="w-32 h-32 rounded-full glass border-2 border-cyan-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,211,238,0.3)] relative z-10">
                    <span className="material-symbols-outlined text-cyan-400 text-5xl">bolt</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white mt-2">Supabase Real-time</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative">
                  <span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px]">chevron_right</span>
                </div>
              </div>
              <div className="md:hidden w-[1px] h-10 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent relative">
                 <span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] rotate-90">chevron_right</span>
              </div>

              {/* Dashboard Node */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center border-white/20 mb-4 shadow-lg shadow-black/50">
                  <span className="material-symbols-outlined text-cyan-400 text-4xl">dashboard</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">UI Dashboard</span>
              </div>

            </div>

            {/* Architecture description text */}
            <div className="mt-16 max-w-2xl mx-auto glass p-6 rounded-xl border-white/10 relative z-10 text-sm text-slate-300 leading-relaxed">
              Environmental data is sampled at <span className="text-cyan-400 font-bold">1Hz</span> via the ESP32, pushed to Supabase via a secure WebSocket connection, and instantly distributed to all connected clients using the <span className="text-cyan-400 font-bold">Postgres Changes</span> broadcast system.
            </div>
            
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 pt-6 pb-6 px-6 mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-inter">PMU Monitoring</span>
            <span className="text-slate-500 text-sm">| © 2024 Technical Division</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">API Keys</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
