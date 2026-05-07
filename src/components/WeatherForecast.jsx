import React, { useState, useEffect } from 'react';

// WMO Weather interpretation codes mapped to Emoji
const getWeatherDetails = (code) => {
  if (code === 0) return { icon: '☀️', description: 'Cerah', color: 'text-amber-400' };
  if (code === 1 || code === 2) return { icon: '⛅', description: 'Cerah Berawan', color: 'text-amber-400' };
  if (code === 3) return { icon: '☁️', description: 'Berawan', color: 'text-slate-400' };
  if (code >= 45 && code <= 48) return { icon: '🌫️', description: 'Berkabut', color: 'text-slate-400' };
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return { icon: '🌧️', description: 'Hujan', color: 'text-blue-400' };
  }
  if (code >= 71 && code <= 77 || code === 85 || code === 86) return { icon: '🌨️', description: 'Bersalju', color: 'text-cyan-200' };
  if (code >= 95 && code <= 99) return { icon: '⛈️', description: 'Badai Petir', color: 'text-yellow-500' };
  return { icon: '⛅', description: 'Tidak Diketahui', color: 'text-slate-400' };
};

const daysID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function WeatherForecast() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        // Prasetiya Mulya Coordinates: -6.3003, 106.6399
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-6.3003&longitude=106.6399&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FJakarta&forecast_days=7'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const data = await response.json();
        
        const formattedData = data.daily.time.map((time, index) => {
          const dateObj = new Date(time);
          return {
            date: time,
            dayName: daysID[dateObj.getDay()],
            maxTemp: Math.round(data.daily.temperature_2m_max[index]),
            minTemp: Math.round(data.daily.temperature_2m_min[index]),
            weatherCode: data.daily.weathercode[index],
            ...getWeatherDetails(data.daily.weathercode[index])
          };
        });

        setForecast(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("Gagal memuat prakiraan cuaca.");
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-32 rounded-xl glass flex items-center justify-center animate-pulse mt-6">
        <span className="text-muted dark:text-slate-400">Memuat Prakiraan Cuaca...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-32 rounded-xl glass flex items-center justify-center mt-6">
        <span className="text-error">{error}</span>
      </div>
    );
  }

  return (
    <div className="w-full mt-2">
      <div className="mb-2">
        <h3 className="font-header-md text-on-surface dark:text-white">Prakiraan 7 Hari Kedepan</h3>
        <p className="text-body-sm text-muted dark:text-slate-400">Berdasarkan data satelit cuaca</p>
      </div>
      <div className="w-full flex justify-between items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
        {forecast.map((day, index) => {
        const isToday = index === 0;
        return (
          <div 
            key={day.date} 
            className={`flex flex-col items-center justify-center min-w-[80px] p-4 rounded-[20px] transition-all duration-300 ${
              isToday 
                ? 'bg-[#f4f5f6] dark:bg-white/10' 
                : 'bg-transparent hover:bg-surface-container dark:hover:bg-white/5'
            }`}
          >
            <span className={`text-lg mb-2 font-inter ${isToday ? 'text-on-surface dark:text-white font-medium' : 'text-on-surface dark:text-white font-normal'}`}>
              {day.dayName}
            </span>
            <span className="text-[40px] drop-shadow-sm mb-2 leading-none" title={day.description}>
              {day.icon}
            </span>
            <div className="flex items-baseline gap-1.5 font-inter">
              <span className="text-[15px] font-medium text-on-surface dark:text-white">{day.maxTemp}°</span>
              <span className="text-[15px] text-[#8e8e93] dark:text-slate-400">{day.minTemp}°</span>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
