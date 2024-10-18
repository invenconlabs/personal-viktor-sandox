import { TestCanvas } from './components/ui/TestCanvas';
import Chart from 'chart.js/auto';
import StreamingPlugin from '@robloche/chartjs-plugin-streaming';
import { useState } from 'react';

Chart.register(StreamingPlugin);

function App() {
  return <div className="min-h-full min-w-full bg-slate-900 text-slate-200">{<Wrapper />}</div>;
}

const Wrapper = () => {
  const [freeze, setFreeze] = useState(false);
  const [count, setCount] = useState(0);
  const toggleFreeze = () => setFreeze((prev) => !prev);
  return (
    <div className="relative flex flex-col items-center justify-between">
      <button onClick={toggleFreeze}>Freeze</button>
      <h1>Total points: {count}</h1>
      {Array.from({ length: 20 }).map((_v, i) => (
        <div key={i} className="">
          <TestCanvas freeze={freeze} onAddPoint={() => setCount((prev) => prev + 1)} />
        </div>
      ))}
    </div>
  );
};

export default App;
