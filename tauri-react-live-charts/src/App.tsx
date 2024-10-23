import { useCallback, useState } from 'react';
import { LineChart } from './components/ui/LineChart';
import { DataPoint } from './lib/types';

export const App = () => {
  const [count, setCount] = useState(0);
  const [freezeChart, setFreezeChart] = useState(false);

  const handleRefresh = useCallback((): DataPoint => {
    return {
      timestamp: Date.now(),
      value: Math.random(),
    };
  }, []);

  const handleDataPointAdded = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleDataPointRemoved = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const handleToggleFreezeChart = () => setFreezeChart((prev) => !prev);

  return (
    <div className="bg-slate-200">
      <div className="flex items-center justify-center">
        <h1 className="min-w-96">
          Number of data points:
          <strong> {count}</strong>
        </h1>
        <button
          onClick={handleToggleFreezeChart}
          className="border border-slate-300 bg-slate-300 hover:bg-slate-200"
        >
          Freeze
        </button>
      </div>
      <div>
        {Array.from({ length: 10 }, (_v, i) => (
          <div className="min-h-[120px] min-w-[400]" key={i}>
            <LineChart
              refreshRate={50}
              windowSizeMs={480_000}
              onRefresh={handleRefresh}
              onDataPointAdded={handleDataPointAdded}
              onDataPointRemoved={handleDataPointRemoved}
              freezeChart={freezeChart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
