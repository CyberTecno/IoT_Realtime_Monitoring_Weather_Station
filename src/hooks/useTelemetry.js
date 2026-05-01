import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useTelemetry() {
  const [reading, setReading] = useState(null);
  const [vibration, setVibration] = useState(null);
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        // Latest sensor reading
        const { data: currentReading, error: readError } = await supabase
          .from('sensor_readings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (currentReading) setReading(currentReading);

        // Latest vibration event
        const { data: currentVib, error: vibError } = await supabase
          .from('vibration_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (currentVib) setVibration(currentVib);

        // Historical for Deep Dive (last 24 hours roughly)
        const { data: histData } = await supabase
          .from('sensor_readings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1440);
          
        if (histData) setHistorical(histData);
        
      } catch (error) {
        console.error("Error fetching telemetry:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Subscribe to real-time updates for sensor_readings
    const sensorSubscription = supabase
      .channel('sensor_readings_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensor_readings' },
        (payload) => {
          setReading(payload.new);
          setHistorical(prev => [payload.new, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    // Subscribe to real-time updates for vibration_events
    const vibrationSubscription = supabase
      .channel('vibration_events_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'vibration_events' },
        (payload) => {
          setVibration(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sensorSubscription);
      supabase.removeChannel(vibrationSubscription);
    };
  }, []);

  return { reading, vibration, historical, loading };
}
