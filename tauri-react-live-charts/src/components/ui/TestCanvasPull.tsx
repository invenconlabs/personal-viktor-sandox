import { Chart } from 'chart.js';
import { DataPoint } from './DataPoint';
import 'chartjs-adapter-luxon';
import { Line } from 'react-chartjs-2';

type TestCanvasPullProps = {
  dataPoint: DataPoint;
};

export const TestCanvasPull = ({ dataPoint }: TestCanvasPullProps) => {
  return (
    <Line
      data={{
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
      }}
      options={{
        animation: false,
        plugins: {
          streaming: {
            duration: 10000,
            ttl: 100000,
            refresh: 1000,
            delay: 250,
          },
        },
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              onRefresh: (chart: Chart) => {
                if (!dataPoint) return;
                chart.data.datasets[0].data.push({
                  y: dataPoint.value,
                  x: dataPoint.timestamp,
                });
              },
            },
          },
        },
      }}
    />
  );
};
