import { useState } from "react";
import Customer from "./Customer";
import { useNavigate } from "react-router-dom";

const Search = ()=>{
    const [searchInput, setSeachInput] = useState('');
    const [customer , setCustomer] = useState(null);
    const [message , setMessage] = useState('');
    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/api/customer"
    const onChangeHandler =(e)=>{
        setSeachInput(e.target.value);
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        console.log(searchInput);
        await fetch(`${baseURL}/${searchInput}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(async(res)=>{
            const data = await res.json();
            if(res.status===200){
                return data;
            }
            else{
                throw new Error(data.message)
            }
        }).then(results=>{
            setCustomer(results)
        }).catch(err=>{
            setCustomer(null)
            setMessage(err.message)
        })
    }
    const goBackHandler = ()=>{
        navigate('/');
    }
    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <input value = {searchInput} onChange={onChangeHandler} placeholder="username"/>
                <button type="submit">Search</button>
            </form>
            
            {customer? <Customer customer = {customer}/>:<p>{message}</p>}
            <button onClick={goBackHandler}>Go Back</button>
                
        </div>
    )
}
export default Search;