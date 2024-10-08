
import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <TodoWrapper />
      <Toaster />
    </div>
  );
}

export default App;
