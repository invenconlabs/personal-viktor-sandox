import { useCallback, useEffect, useRef } from 'react';
import { DataPoint } from '../../lib/types';
import Dygraph, { dygraphs } from 'dygraphs';

type LineChartProps = {
  dataPoint: DataPoint;
};

export const LineChart = ({ dataPoint }: LineChartProps) => {
  const domRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Dygraph | null>(null);
  const dataRef = useRef<number[][]>();
  const windowSize = 240_000;
  const createChart = useCallback(() => {
    if (!domRef.current) return;
    const options: dygraphs.Options = {
      labels: ['X', 'Y1'],
    };
    const graph = new Dygraph(domRef.current, [[0, 0]], options);
    instanceRef.current = graph;
    console.log('chart created');
  }, []);

  const destroyChart = useCallback(() => {
    if (!instanceRef.current) return;
    instanceRef.current.destroy();
    instanceRef.current = null;
    dataRef.current = [];
    console.log('chart destroyed');
  }, []);

  const addDataPoint = useCallback((dataPoint: DataPoint) => {
    if (!instanceRef.current || !dataRef.current) return;
    const { timestamp: x, value: y } = dataPoint;
    dataRef.current?.push([x, y]);
    if (dataRef.current.length > windowSize) {
      dataRef.current = dataRef.current.slice(1);
    }
    instanceRef.current.updateOptions({
      file: dataRef.current,
    });
  }, []);

  useEffect(() => {
    createChart();
    return () => destroyChart();
  }, [createChart, destroyChart]);

  useEffect(() => {
    addDataPoint(dataPoint);
  }, [addDataPoint, dataPoint]);

  return <div ref={domRef} />;
};
