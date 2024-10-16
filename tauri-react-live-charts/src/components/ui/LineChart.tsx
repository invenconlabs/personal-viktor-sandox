import { useCallback, useEffect, useRef, useState } from 'react';
import { DataPoint } from './DataPoint';
import { WebglPlot, WebglLine, ColorRGBA } from 'webgl-plot';
import { useScroll } from '../../hooks/useScroll';

type LineChartProps = {
  height: number;
  width: number;
  data: DataPoint | undefined;
  lengthX: number;
};

export const LineChart = ({ height, width, data, lengthX }: LineChartProps) => {
  const webglp = useRef<WebglPlot>();
  const line = useRef<WebglLine>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [xScale, setXScale] = useState(1);
  const [yScale, setYScale] = useState(1);

  useEffect(() => {
    if (canvasRef.current) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvasRef.current.width = canvasRef.current.clientWidth * devicePixelRatio;
      canvasRef.current.height = canvasRef.current.clientHeight * devicePixelRatio;

      line.current = new WebglLine(
        new ColorRGBA(Math.random(), Math.random(), Math.random(), 1),
        lengthX,
      );
      webglp.current = new WebglPlot(canvasRef.current);
      line.current.arrangeX();
      webglp.current.addLine(line.current);
    }
  }, [lengthX]);

  //DATA
  useEffect(() => {
    let id = 0;
    let renderPlot = () => {
      if (line.current && webglp.current) {
        if (data) {
          line.current.setY(0, data.value);
          webglp.current.gScaleX = xScale;
          webglp.current.gScaleY = yScale;
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
  }, [data, xScale, yScale]);

  const handleScroll = useCallback((event: WheelEvent) => {
    setXScale((prev) => prev * event.deltaX * 0.01);
    setYScale((prev) => prev * event.deltaX * 0.01);
  }, []);

  useScroll(handleScroll);

  //STYLE
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
