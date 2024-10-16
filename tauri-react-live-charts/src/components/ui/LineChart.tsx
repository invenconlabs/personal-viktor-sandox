import { useEffect, useRef, useState } from 'react';
import { DataPoint } from './DataPoint';
import * as fc from 'd3fc';
import * as d3 from 'd3';

type LineChartProps = {
  dataPoint: DataPoint;
};

export const LineChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const canvas = chartRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const width = canvas.width;
    const height = canvas.height;

    const data = [
      { x: 0, y: 30 },
      { x: 1, y: 50 },
      { x: 2, y: 80 },
      { x: 3, y: 65 },
      { x: 4, y: 95 },
    ];

    const xScale = d3.scaleLinear().domain([0, 4]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .context(context);

    context.clearRect(0, 0, width, height);
    context.beginPath();
    line(data);
    context.strokeStyle = 'steelblue';
    context.lineWidth = 2;
    context.stroke();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};
