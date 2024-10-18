// import { DataPoint } from './DataPoint';
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

// type LineChartProps = {
//   dataPoints: DataPoint[];
// };
export const LineChart = (/*{ dataPoints }: LineChartProps*/) => {
  // const x = (d: DataPoint) => d.timestamp;
  // const y = (d: DataPoint) => d.value;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'My First dataset',
              data: [1, 2, 3],
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        },
        options: {
          animation: false,
          normalized: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }
  }, [canvasRef]);
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={500}
      height={500}
      style={{
        border: 'none',
        width: '100%',
      }}
    />
  );
};
