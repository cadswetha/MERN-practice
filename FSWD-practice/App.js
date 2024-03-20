import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import './App.css';
import Add from './components/Add';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
