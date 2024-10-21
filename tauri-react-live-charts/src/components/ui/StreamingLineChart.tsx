import { Chart, ChartConfiguration } from 'chart.js';
import { useCallback, useEffect, useRef } from 'react';
import { createRandomSeries, setChartFreeze, setChartZoomY, ZoomLevel } from './lib';
import { DataPoint } from './DataPoint';

type StreamingChartProps = {
  onDataPointAdded: () => void;
  freeze: boolean;
  zoomLevel: ZoomLevel;
  dataPoint: DataPoint;
};
export const StreamingLineChart = ({
  onDataPointAdded,
  freeze,
  zoomLevel,
  dataPoint,
}: StreamingChartProps) => {
  const chartDomRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const createChart = useCallback(() => {
    if (!chartDomRef.current) {
      return;
    }
    const { dataSets, yScales, zoomLimits: yZoomLimits } = createRandomSeries(1);

    const chartOptions: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: dataSets,
      },
      options: {
        plugins: {
          decimation: {
            enabled: true,
            algorithm: 'lttb',
            samples: 1000,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            limits: {
              ...yZoomLimits,
              x: {
                min: 0, //Date.now(),
                max: 100, //Date.now() + 1000 * 60 * 60,
                minRange: 1000 * 60,
              },
            },
            zoom: {
              wheel: {
                enabled: false,
              },
              pinch: {
                enabled: false,
              },

              mode: 'xy',
            },
          },
        },
        datasets: {
          line: {
            borderWidth: 0.5,
            tension: 0,
            stepped: false,
            borderDash: [],
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        parsing: false,
        normalized: true,
        spanGaps: true,
        maintainAspectRatio: false,
        animation: false,
        responsive: true,
        resizeDelay: 500,
        scales: {
          ...yScales,
          x: {
            type: 'realtime',
            ticks: {
              minRotation: 30,
              maxRotation: 30,
              sampleSize: 1,
            },
            realtime: {
              delay: 250,
              refresh: 50,
              frameRate: 10,
              ttl: 240_000,
              pause: false,
              duration: 240_000,
            },
          },
        },
      },
    };
    const ctx = chartDomRef.current!.getContext('2d')!;
    const chart = new Chart(ctx, chartOptions);
    chartInstanceRef.current = chart;
    console.log('chart created');
  }, []);

  const destroyChart = useCallback(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
      console.log('chart destroyed');
    }
  }, []);

  useEffect(() => {
    createChart();
    return () => destroyChart();
  }, [createChart, destroyChart, onDataPointAdded]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    setChartFreeze(chart, freeze);
  }, [freeze]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    setChartZoomY(chart, zoomLevel);
  }, [zoomLevel]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (!chart) {
      return;
    }
    chart.data.datasets[0].data.push({
      x: dataPoint.timestamp,
      y: dataPoint.value,
    });
    onDataPointAdded();
    chart.update('quiet');
  }, [dataPoint.timestamp, dataPoint.value, onDataPointAdded]);
  return (
    <div className="min-h-60 w-full">
      <canvas ref={chartDomRef} />
    </div>
  );
};
