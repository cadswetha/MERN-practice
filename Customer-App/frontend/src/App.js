import './App.css';
import { useState } from 'react';
import Search from './components/Search';
import Add from './components/Add';
import DisplayCustomers from './components/DisplayCustomers';

function App() {
  const [formVisible , setFormVisible] = useState(false);
  const [message , setMessage] = useState(null);
  const [displayResult ,setDisplayResult] = useState(null);
  const [displayVisible ,setDisplayVisible] = useState(false);
  const baseURL = 'http://localhost:8080/api/customer';
  const onAddHandler = ()=>{
    setDisplayVisible(false);
    setMessage(null);
    setFormVisible(true);
  }
  const onDisplayHandler = async()=>{
    await fetch(baseURL , {
      method : 'GET',
      headers:{'Content-Type':'application/json'}
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      setDisplayResult(res);
    })
    .catch(err=>console.log(err));

    setFormVisible(false);
    setMessage(null);
    setDisplayVisible(true);
  }
  return (
    <div className="App">
      <Search setSearchResultFn = {setDisplayResult} setDisplayVisible ={setDisplayVisible}/>
      <button onClick={onAddHandler}>Add Customer</button>
      <button onClick={onDisplayHandler}>Display Customers</button>
      {formVisible && <Add setFormVisible = {setFormVisible} setMessage ={setMessage}/>}
      {message && <h1>{message}</h1>}
      {displayVisible && <DisplayCustomers data = {displayResult} setDisplayVisible={setDisplayVisible} setMessage ={setMessage}/>}
    </div>
  );
}

export default App;
