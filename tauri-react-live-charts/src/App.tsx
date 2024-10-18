import { TestCanvas } from './components/ui/TestCanvas';
import { useDataPoint } from './hooks/useData';

function App() {
  return <div className="h-[200px] w-[1000px] bg-slate-300">{/* <Wrapper /> */}</div>;
}

const Wrapper = () => {
  const { dataPoint } = useDataPoint();
  return dataPoint && <TestCanvas dataPoint={dataPoint} />;
};

export default App;
