import { Chart, ChartOptions } from 'chart.js';
import 'chartjs-adapter-luxon';
import { useRef, useState } from 'react';
import { Line, getElementAtEvent } from 'react-chartjs-2';

export const TestCanvas = ({ freeze, onAddPoint }: { freeze: boolean; onAddPoint: () => void }) => {
  const chartRef = useRef<Chart<'line'>>(null);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log(getElementAtEvent(chartRef.current!, event));
  };
  const [data] = useState(() => ({
    labels: [],
    datasets: [
      {
        label: 'dataset1',
        data: [],
        fill: false,
        borderColor: 'rgba(252, 119, 170,1)',
        borderWidth: 0.5,
        pointBorderWidth: 0.5,
        pointRadius: 0.5,
        pointHitRadius: 3,
      },
      {
        label: 'dataset2',
        data: [],
        fill: false,
        borderColor: 'rgba(218,247,166,1)',
        borderWidth: 0.5,
        pointBorderWidth: 0.5,
        pointRadius: 0.5,
        pointHitRadius: 3,
      },
    ],
  }));

  const options: ChartOptions<'line'> = {
    responsive: true,
    resizeDelay: 500,
    animation: false,
    aspectRatio: 6,
    parsing: false,
    onResize(_chart, size) {
      console.log(size);
    },
    plugins: {
      streaming: {
        duration: 60_000,
        ttl: 600_000,
        delay: 100,
        frameRate: 30,
        refresh: 100,
        pause: freeze,
      },
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          onRefresh: (chart: Chart) => {
            const timestamp = new Date().getTime();
            chart.data.datasets.forEach((ds) =>
              ds.data.push({
                x: timestamp,
                y: Math.random(),
              }),
            );

            onAddPoint();
          },
        },
      },
    },
  };

  return (
    <Line
      style={{ position: 'relative', height: '20vh', width: '70vw' }}
      onClick={handleClick}
      ref={chartRef}
      data={data}
      options={options}
    />
  );
};
