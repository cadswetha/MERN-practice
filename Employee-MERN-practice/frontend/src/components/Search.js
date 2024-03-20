import { useState } from "react";
import Employee from "./Employee";
import { useNavigate } from "react-router-dom";

const Search = () =>{
    const [searchMin ,setSearchMin] = useState()
    const [searchMax ,setSearchMax] = useState()
    const [employees,setEmployees] =useState(null)
    const baseURL = "http://localhost:5000/api/employee"

    const onSubmit = async(e) =>{
        e.preventDefault();
        await fetch(baseURL,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(results =>{
            console.log(results);
            setEmployees(results);
        }).catch(err =>{
            console.log(err);
            setEmployees(null)
        })
    }
    const navigate = useNavigate();

    const goBackHandler =()=>{
        navigate("/")
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Min: </label>
                <input value={searchMin} onChange={(e)=>setSearchMin(e.target.value)}/>
                <label>Max: </label>
                <input value={searchMax} onChange={(e)=>setSearchMax(e.target.value)}/>
                <button type="submit">Search</button>
                <div>
                {employees && employees.filter((employee)=>{
                    let smin = Number(searchMin)
                    let smax  = Number(searchMax)
                    let ea = Number(employee.age)
                    return ea>=smin && ea<=smax
                }).map(employee=>{
                    return(
                        <Employee employee = {employee}/>
                    )
                })}
                </div>
            </form>
            <button onClick={goBackHandler}>Go back</button>
        </div>
    )
}
export default Search;