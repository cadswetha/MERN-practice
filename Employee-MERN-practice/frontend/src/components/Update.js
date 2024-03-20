import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () =>{
    const location = useLocation();
    const employee = location.state
    const [email,setEmail] = useState(employee.email)
    const [password,setPassword] = useState(employee.password)
    const [age,setAge] = useState(employee.age)
    const [message,setMessage] = useState('')
    const baseURL = "http://localhost:5000/api/employee"
    const onSubmit = async(e) =>{
        e.preventDefault();
        await fetch(baseURL,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "email":email,
                "password":password,
                "age":age
            })
        }).then(res=>res.json())
        .then(rseults =>{
            console.log(rseults);
            setMessage('customer updated');
        }).catch(err =>{
            console.log(err);
            setMessage('Error occured!')
        })
    }
    const navigate = useNavigate();

    const goBackHandler =()=>{
        navigate("/")
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Email: </label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <label>Password: </label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <label>Email: </label>
                <input type="number" value={age} onChange={(e)=>setAge(e.target.value)}/>
                <br/>
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
            <button onClick={goBackHandler}>Go back</button>
        </div>
    )
}
export default Update;