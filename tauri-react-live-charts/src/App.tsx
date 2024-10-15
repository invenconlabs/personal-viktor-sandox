import { useData } from './hooks/useData';

function App() {
  const { data } = useData(1000);
  return <div>HEJ</div>;
}

export default App;
