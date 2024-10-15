import { useEffect, useRef } from 'react';
import { DataPoint } from './DataPoint';
import { WebglPlot, WebglLine, ColorRGBA } from 'webgl-plot';

type LineChartProps = {
  height: number;
  width: number;
  data: DataPoint[];
};

export const LineChart = ({ height, width, data }: LineChartProps) => {
  const webglp = useRef<WebglPlot>();
  const line = useRef<WebglLine>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvasRef.current.width = canvasRef.current.clientWidth * devicePixelRatio;
      canvasRef.current.height = canvasRef.current.clientHeight * devicePixelRatio;

      const numX = 1000;
      line.current = new WebglLine(
        new ColorRGBA(Math.random(), Math.random(), Math.random(), 1),
        numX,
      );
      webglp.current = new WebglPlot(canvasRef.current);
      line.current.arrangeX();
      webglp.current.addLine(line.current);
    }
  }, []);

  //DATA
  useEffect(() => {
    let id = 0;
    let renderPlot = () => {
      if (line.current && webglp.current) {
        for (let i = 0; i < data.length; i++) {
          line.current.setY(i, data[i].value);
        }
        id = requestAnimationFrame(renderPlot);
        webglp.current.update();
      }
    };
    id = requestAnimationFrame(renderPlot);

    return () => {
      renderPlot = () => {};
      cancelAnimationFrame(id);
    };
  }, [data]);

  const canvasStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div>
      <canvas style={canvasStyle} ref={canvasRef} />
    </div>
  );
};
