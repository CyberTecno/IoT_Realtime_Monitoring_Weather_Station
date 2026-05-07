import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTelemetry } from '../hooks/useTelemetry';

const tabToColumn = {
  Temp: 'temp_bme',
  Humidity: 'hum_bme',
  AQI: 'pm2_5',
  Wind: 'wind_speed',
  UV: 'lux'
};

const metricInfo = {
  Temp: { unit: '°C', label: 'Temperature', icon: 'sensors', color: '#4cd7f6' },
  Humidity: { unit: '%', label: 'Humidity', icon: 'water_drop', color: '#3b82f6' },
  AQI: { unit: ' AQI', label: 'Air Quality Index', icon: 'air', color: '#10b981' },
  Wind: { unit: ' km/h', label: 'Wind Speed', icon: 'airwave', color: '#a855f7' },
  UV: { unit: ' UVI', label: 'UV Index', icon: 'light_mode', color: '#eab308' },
};

export default function DeepDive() {
  const { historical, loading } = useTelemetry();
  const tabs = ['Temp', 'Humidity', 'AQI', 'Wind', 'UV'];
  const [activeTab, setActiveTab] = useState('Temp');
  const [visibleCount, setVisibleCount] = useState(10);
  
  const info = metricInfo[activeTab];
  const col = tabToColumn[activeTab];

  const { chartData, current, peak, min } = useMemo(() => {
    if (!historical || historical.length === 0) {
      return { chartData: [], current: '0.0', peak: '0.0', min: '0.0' };
    }

    const values = historical.map(r => r[col]).filter(v => v != null);
    const curr = values.length > 0 ? values[0].toFixed(1) : '0.0';
    const pk = values.length > 0 ? Math.max(...values).toFixed(1) : '0.0';
    const mn = values.length > 0 ? Math.min(...values).toFixed(1) : '0.0';

    // Sort ascending for chart (oldest first)
    const sorted = [...historical].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    
    // Map all data points directly to show real-time updates
    const processedChartData = sorted.map(item => ({
      time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actual: item[col] || 0
    }));

    // Add forecast data points
    if (processedChartData.length > 5) {
      const windowSize = 5;
      const recentPoints = processedChartData.slice(-windowSize);
      
      let sumChange = 0;
      for (let i = 1; i < recentPoints.length; i++) {
        sumChange += (recentPoints[i].actual - recentPoints[i-1].actual);
      }
      const avgChange = sumChange / (windowSize - 1);
      
      const lastPoint = processedChartData[processedChartData.length - 1];
      const lastDate = new Date(sorted[sorted.length - 1].created_at);
      
      lastPoint.forecast = lastPoint.actual;
      
      for (let i = 1; i <= 6; i++) {
        const futureDate = new Date(lastDate.getTime() + (i * 10 * 1000));
        const futureVal = lastPoint.actual + (avgChange * i);
        const safeVal = futureVal < 0 ? 0 : futureVal;
        
        processedChartData.push({
          time: futureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          forecast: safeVal
        });
      }
    }

    return { chartData: processedChartData, current: curr, peak: pk, min: mn };
  }, [historical, activeTab, col]);

  const handleExportCSV = () => {
    if (!historical || historical.length === 0) return;

    const headers = Object.keys(historical[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    for (const row of historical) {
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
    link.setAttribute('download', `pmu_telemetry_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="pt-24 pb-32 px-margin max-w-7xl mx-auto space-y-gutter">
      {/* Metric Selector & Title */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-primary tracking-tight">Analytical Deep Dive</h1>
          <p className="font-body-sm text-on-surface-variant">Real-time telemetry from STEM Rooftop</p>
        </div>
        <div className="glass-inset rounded-xl p-1 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-label-caps transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-secondary-container text-on-secondary'
                  : 'text-on-surface-variant hover:bg-surface-container dark:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Bento Grid Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
        {/* Summary Stats (Vertical Stack) */}
        <div className="lg:col-span-1 space-y-stack-gap">
          <div className="glass-card p-card-padding rounded-xl flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-secondary uppercase">Current Value</span>
              <span className="material-symbols-outlined text-secondary text-sm">{info.icon}</span>
            </div>
            <div>
              <div className="font-display-lg text-on-surface dark:text-white">{current}{info.unit}</div>
              <div className="font-body-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> Updated just now
              </div>
            </div>
          </div>
          <div className="glass-card p-card-padding rounded-xl flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-on-surface-variant uppercase">Daily Peak</span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_upward</span>
            </div>
            <div>
              <div className="font-display-lg text-on-surface dark:text-white">{peak}{info.unit}</div>
              <div className="font-body-sm text-on-surface-variant">Based on recent data</div>
            </div>
          </div>
          <div className="glass-card p-card-padding rounded-xl flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-on-surface-variant uppercase">Daily Min</span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_downward</span>
            </div>
            <div>
              <div className="font-display-lg text-on-surface dark:text-white">{min}{info.unit}</div>
              <div className="font-body-sm text-on-surface-variant">Based on recent data</div>
            </div>
          </div>
        </div>

        {/* Main Trend Chart */}
        <div className="lg:col-span-3 glass-card rounded-xl overflow-hidden flex flex-col">
          <div className="p-card-padding border-b border-outline-variant dark:border-white/10 flex justify-between items-center">
            <h3 className="font-header-md text-on-surface dark:text-white">24-Hour {info.label} Trend</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 font-label-caps text-on-surface-variant">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }}></span> Actual
              </span>
              <span className="flex items-center gap-2 font-label-caps text-on-surface-variant">
                <span className="w-3 h-3 rounded-full border border-dashed" style={{ borderColor: info.color }}></span> Forecast
              </span>
            </div>
          </div>
          <div className="flex-grow p-6 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`colorActual-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={info.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={info.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(16, 19, 26, 0.8)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: '#fff' }}
                  itemStyle={{ color: info.color }}
                />
                <Area type="monotone" dataKey="actual" stroke={info.color} strokeWidth={3} fillOpacity={1} fill={`url(#colorActual-${activeTab})`} />
                <Area type="monotone" dataKey="forecast" stroke={info.color} strokeOpacity={0.6} strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Data Table Section */}
      <section className="space-y-stack-gap">
        <div className="flex items-center justify-between">
          <h3 className="font-header-md text-on-surface dark:text-white">Historical Telemetry</h3>
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 glass-inset rounded-lg font-label-caps text-secondary hover:bg-surface-container-high dark:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-sm">download</span> Export CSV
          </button>

        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container dark:bg-white/5 border-b border-outline-variant dark:border-white/10">
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider">Sensor ID</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider">Reading</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider text-right">Delta</th>
                </tr>
              </thead>
              <tbody className="font-data-mono">
                {historical.slice(0, visibleCount).map((row, idx) => (
                  <tr key={row.id || idx} className="border-b border-white/5 hover:bg-surface-container dark:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-on-surface dark:text-white">{new Date(row.created_at).toLocaleString()}</td>
                    <td className="px-6 py-4 text-on-surface-variant">TMP-N04-A</td>
                    <td className="px-6 py-4 text-secondary">{row[col] != null ? row[col].toFixed(1) : '-'}{info.unit}</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold border border-emerald-500/20">Nominal</span></td>
                    <td className="px-6 py-4 text-right text-emerald-400">-</td>
                  </tr>
                ))}
                {visibleCount < historical.length && (
                  <tr 
                    className="hover:bg-surface-container dark:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setVisibleCount(prev => prev + 10)}
                  >
                    <td className="px-6 py-4 text-center font-label-caps text-on-surface-variant hover:text-on-surface dark:text-white" colSpan="5">
                      Load More
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
