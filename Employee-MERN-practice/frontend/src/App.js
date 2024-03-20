import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Display from './components/Display';
import Search from './components/Search';
import Update from './components/Update';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path ="/" element = {<Display/>}/>
        <Route path ="/add" element = {<Add/>}/>
        <Route path ="/search" element = {<Search/>}/>
        <Route path ="/update" element = {<Update/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
