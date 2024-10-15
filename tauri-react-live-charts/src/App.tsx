import { ParentSize } from '@visx/responsive';
import { LineChart } from './assets/components/ui/LineChart';
import { useData } from './hooks/useData';

function App() {
  const { data } = useData(1000);
  return (
    <div className="h-[100px] w-[1000px]">
      <ParentSize>
        {({ width, height }) => (
          <>
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
            <LineChart width={width} height={height} data={data} />
          </>
        )}
      </ParentSize>
    </div>
  );
}

export default App;
