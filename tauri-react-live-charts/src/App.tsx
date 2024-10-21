import { LineChart } from './components/ui/LineChart';
import { useDataPoint } from './hooks/useDataPoint';

export const App = () => {
  const { dataPoint } = useDataPoint();
  return (
    dataPoint && (
      <div>
        <LineChart dataPoint={dataPoint} />
      </div>
    )
  );
};
