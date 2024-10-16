import { useData } from './hooks/useData';

function App() {
  const { data } = useData(1000);
  return <div>todo</div>;
}

export default App;
