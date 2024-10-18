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
        label: 'dataset',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  }));

  const options: ChartOptions<'line'> = {
    responsive: true,
    resizeDelay: 500,
    animation: false,
    aspectRatio: 6,
    onResize(chart, size) {
      console.log(size);
    },
    plugins: {
      streaming: {
        duration: 600_000,
        ttl: 600_000,
        delay: 1000,
        frameRate: 30,
        refresh: 250,
        pause: freeze,
      },
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          onRefresh: (chart: Chart) => {
            chart.data.datasets[0].data.push({
              x: new Date().getTime(),
              y: Math.random(),
            });
            onAddPoint();
          },
        },
      },
    },
  };

  return (
    <Line
      style={{ position: 'relative', height: '40vh', width: '80vw' }}
      onClick={handleClick}
      ref={chartRef}
      data={data}
      options={options}
    />
  );
};
