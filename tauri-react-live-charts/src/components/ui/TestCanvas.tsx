import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import { DataPoint } from './DataPoint';
import StreamingPlugin from '@robloche/chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

type TestCanvasProps = {
  dataPoint: DataPoint;
};

Chart.register(StreamingPlugin);

export const TestCanvas = ({ dataPoint }: TestCanvasProps) => {
  const [chart, setChart] = useState<Chart>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas.current!.getContext('2d');
    if (context !== null) {
      const myChart = new Chart(context, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'dataset',
              data: [],
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        },
        options: {
          plugins: {
            streaming: {
              duration: 10000,
              ttl: 100000,
              refresh: 1000,
            },
          },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 250,
                onRefresh: (chart: Chart) => {
                  console.log(dataPoint);
                  chart.data.datasets[0].data.push({
                    y: dataPoint.value,
                    x: dataPoint.timestamp,
                  });
                },
              },
            },
          },
        },
      });
      setChart(myChart);
      return () => myChart.destroy();
    }
  }, []);

  return <canvas ref={canvas} width="400" height="400"></canvas>;
};
