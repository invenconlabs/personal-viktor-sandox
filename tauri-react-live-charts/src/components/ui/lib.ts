import { Chart } from 'chart.js';

export const setChartZoomY = (chart: Chart | null, zoomLevel: ZoomLevel) => {
  if (!chart) {
    return;
  }
  chart.zoomScale('y0', { ...zoomLevel }, 'zoom');
};

export const setChartFreeze = (chart: Chart | null, freeze: boolean) => {
  if (!chart) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xAxis = chart.options.scales?.x as any;
  if (xAxis && xAxis.realtime) {
    xAxis.realtime.pause = freeze;
    chart.update('none');
  }
};

const generateRandomRGBA = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random().toFixed(2); // Alpha value between 0 and 1 with 2 decimal places

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

type ScaleType = {
  [key: string]: {
    type: string;
    min: number;
    max: number;
  };
};

type ZoomLimits = {
  [key: string]: {
    min: number;
    max: number;
    minRange: number;
  };
};

export const createRandomSeries = (amount: number) => {
  const dataSets = Array.from({ length: amount }, (_v, i) => {
    const color = generateRandomRGBA();
    const dataSet = {
      label: `signal${i}`,
      backgroundColor: color,
      borderColor: color,
      fill: false,
      data: [],
      yAxisID: `y${i}`,
    };

    return dataSet;
  });

  const min = 0;
  const max = 1;
  const minRange = (max - min) / 1000;
  const yScales: ScaleType = Object.fromEntries(
    dataSets.map((dataSet) => [
      dataSet.yAxisID,
      {
        type: 'linear',
        min: min,
        max: max,
      },
    ]),
  );
  const zoomLimits: ZoomLimits = Object.fromEntries(
    dataSets.map((dataSet) => [
      dataSet.yAxisID,
      {
        min: min,
        max: max,
        minRange: minRange,
      },
    ]),
  );

  return { dataSets, yScales, zoomLimits };
};

export type ZoomLevel = {
  min: number;
  max: number;
};
