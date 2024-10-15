import { useData } from './hooks/useData';
import { LineChart } from './components/ui/LineChart';

function App() {
  const { data } = useData(2000);
  return (
    <div className="flex flex-col items-center justify-between">
      <LineChart height={120} width={1000} data={data.filter((d) => d.id === 0)} />
      <LineChart height={120} width={1000} data={data.filter((d) => d.id === 1)} />

      <button className="border border-black">increment</button>
      <button className="border border-black">decrement</button>
    </div>
  );
}

export default App;
