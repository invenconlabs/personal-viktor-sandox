import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { DataPoint } from '../../lib/types';
import Dygraph, { dygraphs } from 'dygraphs';

type LineChartProps = {
  refreshRate: number;
  windowSizeMs: number;
  onRefresh: () => DataPoint;
  onDataPointAdded: () => void;
  onDataPointRemoved: () => void;
  freezeChart: boolean;
};

export const LineChart = ({
  refreshRate,
  windowSizeMs,
  onRefresh,
  onDataPointAdded,
  onDataPointRemoved,
  freezeChart,
}: LineChartProps) => {
  const windowSizePoints = useMemo(
    () => Math.floor(windowSizeMs / refreshRate) + 1,
    [refreshRate, windowSizeMs],
  );
  const domRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Dygraph | null>(null);
  const dataRef = useRef<number[][]>(Array<number[]>(windowSizePoints));

  const createChart = useCallback(() => {
    if (!domRef.current) return;
    const options: dygraphs.Options = {
      labels: ['X', 'Y1'],
      animatedZooms: true,
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

  const addDataPoint = useCallback(
    (dataPoint: DataPoint) => {
      if (!instanceRef.current || !dataRef.current) return;
      const { timestamp: x, value: y } = dataPoint;
      dataRef.current?.push([x, y]);
      onDataPointAdded();
      if (dataRef.current.length > windowSizePoints) {
        dataRef.current.shift();
        onDataPointRemoved();
      }
      if (!freezeChart) {
        instanceRef.current.updateOptions({
          file: dataRef.current,
        });
      }
    },
    [freezeChart, onDataPointAdded, onDataPointRemoved, windowSizePoints],
  );

  useEffect(() => {
    createChart();
    return () => destroyChart();
  }, [createChart, destroyChart]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dataPoint = onRefresh();
      addDataPoint(dataPoint);
    }, refreshRate);
    return () => clearInterval(interval);
  }, [addDataPoint, onRefresh, refreshRate]);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!instanceRef.current) return;
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        instanceRef.current.resize(width, height);
        console.log(`resized chart (${width}, ${height})`);
      }
    });
    observer.observe(resizeRef.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={resizeRef} className="h-full w-full pr-4">
      <div ref={domRef} />
    </div>
  );
};
