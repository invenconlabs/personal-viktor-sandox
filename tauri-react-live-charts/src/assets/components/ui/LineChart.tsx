import { Group } from '@visx/group';
import { DataPoint } from './DataPoint';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridColumns, GridRows } from '@visx/grid';
import { useMemo } from 'react';

type LineChartProps = {
  width: number;
  height: number;
  data: DataPoint[];
};

export const LineChart = ({ width, height, data }: LineChartProps) => {
  //margins
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  //accessors
  const x = (d: DataPoint) => d.timestamp;
  const y = (d: DataPoint) => d.value;

  const xMax = data[data.length - 1]?.timestamp;
  const xMin = xMax - data.length * 100;

  // Scales
  const xScale = scaleTime({
    range: [0, innerWidth],
    domain: [xMin, xMax],
    nice: true,
  });
  const [yMin, yMax] = [0, 1];

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [yMin, yMax],
        nice: true,
      }),
    [innerHeight, yMax, yMin],
  );

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={'#f0f0f5'} rx={14}></rect>
      <Group left={margin.left} top={margin.top}>
        <GridRows scale={yScale} height={innerHeight} width={innerWidth} stroke="#e0e0eb" />
        <GridColumns scale={xScale} height={innerHeight} width={innerWidth} stroke="#e0e0eb" />
        <AxisLeft scale={yScale} />
        <AxisBottom top={innerHeight} scale={xScale} />
        <LinePath<DataPoint>
          data={data}
          defined={(d) => x(d) < xMax && x(d) > xMin && y(d) < yMax && y(d) > yMin}
          x={(d) => xScale(x(d)) ?? 0}
          y={(d) => yScale(y(d)) ?? 0}
          stroke="black"
          strokeWidth={1.5}
          strokeOpacity={0.8}
          shapeRendering="geometricPrecision"
        />
      </Group>
    </svg>
  );
};
