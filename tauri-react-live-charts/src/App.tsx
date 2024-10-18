import { TestCanvas } from './components/ui/TestCanvas';
import Chart from 'chart.js/auto';
import StreamingPlugin from '@robloche/chartjs-plugin-streaming';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { useState } from 'react';

Chart.register(StreamingPlugin);
Chart.register(ZoomPlugin);

function App() {
  return (
    <div className="inset-0 min-h-full min-w-full bg-slate-900 text-slate-200">{<Wrapper />}</div>
  );
}

const Wrapper = () => {
  const [freeze, setFreeze] = useState(false);
  const [count, setCount] = useState(0);
  const toggleFreeze = () => setFreeze((prev) => !prev);
  return (
    <div className="relative flex flex-col items-center justify-between">
      <button className="rounded-md border border-slate-100 bg-slate-800" onClick={toggleFreeze}>
        Freeze
      </button>
      <h1>Total points: {count}</h1>
      {Array.from({ length: 5 }).map((_v, i) => (
        <div key={i}>
          <TestCanvas freeze={freeze} onAddPoint={() => setCount((prev) => prev + 1)} />
        </div>
      ))}
    </div>
  );
};

export default App;
