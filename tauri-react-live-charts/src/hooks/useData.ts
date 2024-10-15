import { useState, useEffect } from 'react';
import { DataPoint } from '../assets/components/ui/DataPoint';

export const useData = (windowSize: number) => {
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const dataPoint = JSON.parse(event.data) as DataPoint;
      setData((prev) => {
        if (prev.length >= windowSize) {
          return [...prev.slice(1), dataPoint];
        }
        return [...prev, dataPoint];
      });
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);
  return { data };
};
