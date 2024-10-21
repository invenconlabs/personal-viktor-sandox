import { useEffect, useState } from 'react';
import { DataPoint } from '../lib/types';

export const useDataPoint = () => {
  const [dataPoint, setDataPoint] = useState<DataPoint>();
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const dataPoint: DataPoint = JSON.parse(event.data);
      setDataPoint(dataPoint);
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
  return { dataPoint };
};
