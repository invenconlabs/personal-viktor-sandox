import { useData } from './hooks/useData';
import { LineChart } from './components/ui/LineChart';

function App() {
  return (
    <div className="flex flex-col items-center justify-between">
      <Wrapper height={400} width={800} />
      <button className="border border-black">increment</button>
      <button className="border border-black">decrement</button>
    </div>
  );
}

type WrapperProps = {
  height: number;
  width: number;
};
const Wrapper = (props: WrapperProps) => {
  const window = 1000;
  const { data } = useData(window);
  return data && <LineChart {...props} data={data} lengthX={window} />;
};

export default App;
