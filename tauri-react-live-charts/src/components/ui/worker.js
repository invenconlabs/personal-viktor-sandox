import { Chart } from 'chart.js';

onmessage = function (event) {
  const { canvas, chartOptions } = event.data;
  const chart = new Chart(canvas, chartOptions);

  // Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
  canvas.width = 100;
  canvas.height = 100;
  chart.resize();
};
