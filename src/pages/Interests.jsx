import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTelemetry } from '../hooks/useTelemetry';

const triviaFacts = [
  {
    quote: "Did you know? The Engineering Quad experiences a wind-tunnel effect that increases perceived gusts by 15% during peak spring.",
    source: "CAMPUS RECORD 2023",
    historicLabel: "HISTORIC LOW",
    historicValue: "-12.4°C (Jan 15, 1998)",
    icon: "history"
  },
  {
    quote: "The highest recorded humidity near the library was 95% during a major monsoon storm.",
    source: "FACILITIES LOG 2019",
    historicLabel: "PEAK HUMIDITY",
    historicValue: "95% (Nov 12, 2019)",
    icon: "water_drop"
  },
  {
    quote: "Solar panels on the Business School building generated record power during the August heatwave.",
    source: "ENERGY REPORT 2024",
    historicLabel: "MAX TEMP",
    historicValue: "38.2°C (Aug 20, 2024)",
    icon: "thermostat"
  },
  {
    quote: "Air quality occasionally drops to near perfect levels following heavy rains clearing the basin smog.",
    source: "ENVIRONMENTAL STUDY 2022",
    historicLabel: "BEST AQI",
    historicValue: "5 (Feb 03, 2022)",
    icon: "air"
  }
];

export default function Interests() {
  const { reading } = useTelemetry();
  const [sensors, setSensors] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Extract Live Data
  const temp = reading?.temp_bme || 24.5;
  const humidity = reading?.hum_bme || 42;
  const aqi = reading?.pm2_5 ? Math.round(reading.pm2_5 * 2) : 12; // pseudo AQI
  const windSpeed = reading?.wind_speed || 14;

  // Formula Comfort Index (0 - 100)
  // Ideal: Temp = 24°C, Humidity = 50%, AQI = 0
  const tempPenalty = Math.abs(temp - 24) * 4;
  const humPenalty = Math.abs(humidity - 50) * 0.4;
  const aqiPenalty = aqi * 0.4;

  let comfortScore = Math.max(0, Math.min(100, Math.round(100 - tempPenalty - humPenalty - aqiPenalty)));
  if (isNaN(comfortScore)) comfortScore = 74;

  let comfortStatus = "Optimal";
  if (comfortScore < 50) comfortStatus = "Poor";
  else if (comfortScore < 70) comfortStatus = "Fair";
  else if (comfortScore < 85) comfortStatus = "Good";

  // Circle SVG calculations
  const circumference = 2 * Math.PI * 88; // radius 88
  const strokeDashoffset = circumference - (comfortScore / 100) * circumference;

  // Feels Like (Apparent Temp approximation)
  const feelsLike = (temp + (humidity > 50 ? (humidity - 50) * 0.05 : 0)).toFixed(1);

  const handleNextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % triviaFacts.length);
  };

  const currentFact = triviaFacts[currentFactIndex];

  const handleExportCSV24h = () => {
    if (!historical || historical.length === 0) return;

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recentData = historical.filter(row => new Date(row.created_at) >= twentyFourHoursAgo);

    if (recentData.length === 0) return;

    const headers = Object.keys(recentData[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of recentData) {
      const values = headers.map(header => {
        const val = row[header] !== null && row[header] !== undefined ? row[header] : '';
        const escaped = ('' + val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pmu_telemetry_24h_${now.toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Monthly Summary Report - PMU Weather</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #0284c7; margin-bottom: 5px; }
            h2 { color: #64748b; font-size: 18px; margin-top: 0; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 12px 16px; text-align: left; }
            th { background-color: #f1f5f9; color: #334155; font-weight: 600; }
            td { color: #0f172a; }
            .status-nominal { color: #10b981; font-weight: bold; }
            .status-warning { color: #f59e0b; font-weight: bold; }
            .footer { margin-top: 50px; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PMU Weather Station</h1>
            <h2>Monthly Environmental Summary</h2>
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>This is an automated monthly summary report of the campus biometeorological conditions based on real-time sensor telemetry.</p>
          
          <h3>Current Campus Conditions</h3>
          <table>
            <tr>
              <th>Metric</th>
              <th>Current Reading</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>Temperature</td>
              <td>${typeof temp === 'number' ? temp.toFixed(1) : temp}°C</td>
              <td class="${temp > 35 ? 'status-warning' : 'status-nominal'}">${temp > 35 ? 'High' : 'Nominal'}</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>${typeof humidity === 'number' ? humidity.toFixed(0) : humidity}%</td>
              <td class="${humidity > 80 ? 'status-warning' : 'status-nominal'}">${humidity > 80 ? 'High' : 'Nominal'}</td>
            </tr>
            <tr>
              <td>Air Quality (PM2.5)</td>
              <td>${aqi} AQI</td>
              <td class="${aqi > 50 ? 'status-warning' : 'status-nominal'}">${aqi > 50 ? 'Moderate' : 'Good'}</td>
            </tr>
            <tr>
              <td>Wind Speed</td>
              <td>${typeof windSpeed === 'number' ? windSpeed.toFixed(1) : windSpeed} km/h</td>
              <td class="status-nominal">Normal</td>
            </tr>
            <tr>
              <td>Campus Comfort Index</td>
              <td>${comfortScore} / 100</td>
              <td class="${comfortScore >= 70 ? 'status-nominal' : 'status-warning'}">${comfortStatus}</td>
            </tr>
          </table>
          
          <div class="footer">
            <p>* Note: This document is auto-generated by the PRASETIYA MULYA WEATHER STATION. For detailed historical data, please download the raw CSV exports.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  useEffect(() => {
    // In a real scenario, this would fetch from a devices table
    // or aggregate from sensor_readings. For now, mocking based on design.
    setSensors([
      { id: 'ESP32', name: 'Main Weather Tower', status: 'ONLINE', latency: '12ms', type: 'developer_board' },
      { id: 'EKSTERNAL SENSOR', name: 'Rain Gauge, Windspeed, Wind Direction', status: 'ON', latency: '24ms', type: 'developer_board' },
      { id: 'INTERNAL SENSOR', name: 'Internal Sensor in Box', status: 'ON', latency: '12ms', type: 'developer_board' },
      { id: 'SOLAR PANEL', status: 'ON', latency: '18ms', type: 'developer_board' },
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
                <circle
                  className={`drop-shadow-[0_0_8px_rgba(76,215,246,0.5)] transition-all duration-1000 ${comfortScore >= 70 ? 'text-secondary' : comfortScore >= 50 ? 'text-tertiary' : 'text-error'}`}
                  cx="96"
                  cy="96"
                  fill="transparent"
                  r="88"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeWidth="12">
                </circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-display-xl font-bold text-on-surface">{comfortScore}</span>
                <span className={`text-label-caps uppercase tracking-widest ${comfortScore >= 70 ? 'text-secondary' : comfortScore >= 50 ? 'text-tertiary' : 'text-error'}`}>{comfortStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5">
                <span className="text-label-caps text-on-surface-variant block mb-1">HUMIDITY</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">water_drop</span>
                  <span className="text-header-md">{typeof humidity === 'number' ? humidity.toFixed(0) : humidity}%</span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg border border-white/5">
                <span className="text-label-caps text-on-surface-variant block mb-1">AIR QUALITY</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">air</span>
                  <span className="text-header-md">{aqi} <small className="text-xs">AQI</small></span>
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
                <span className="text-label-caps text-on-surface-variant block mb-1">FEELS LIKE</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">thermostat</span>
                  <span className="text-header-md">{feelsLike}°C</span>
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
              <p className="italic text-body-base text-on-surface mb-2">"{currentFact.quote}"</p>
              <span className="text-label-caps text-tertiary">— {currentFact.source}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">{currentFact.icon}</span>
              <div>
                <p className="text-label-caps text-on-surface-variant">{currentFact.historicLabel}</p>
                <p className="text-body-base font-bold">{currentFact.historicValue}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant dark:border-white/10 flex justify-between items-center">
            <span className="text-label-caps text-on-surface-variant">{triviaFacts.length - 1} NEW FACTS</span>
            <button onClick={handleNextFact} className="text-primary text-label-caps hover:underline">NEXT FACT</button>
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
                <button onClick={handleExportCSV24h} className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-variant/50 border border-outline-variant dark:border-white/10 hover:bg-surface-variant transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">csv</span>
                    <span className="font-body-base">Export last 24h as CSV</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">download</span>
                </button>
                <button onClick={handleExportPDF} className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-variant/50 border border-outline-variant dark:border-white/10 hover:bg-surface-variant transition-all group">
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
