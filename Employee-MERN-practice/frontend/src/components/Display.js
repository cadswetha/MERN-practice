import { useState,useEffect } from "react";
import Employee from "./Employee";
import { useNavigate } from "react-router-dom";

const Display = () =>{
    const [employees ,setEmployees] = useState();
    const baseURL = "http://localhost:5000/api/employee"
    useEffect(() => {
         const fetchData = async() => {
            await fetch(baseURL,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json())
            .then(results => setEmployees(results))
            .catch(err => console.log(err));
        }
        fetchData()
    }, [employees]);
    const navigate = useNavigate();
    const onAddBtn = ()=>{
        navigate("/add")
    }
    const onSearchBtn = ()=>{
        navigate("/search")
    }
    return(
        <div>
            <h1>Employee Details</h1>
            <button onClick={onAddBtn}>Add employee</button>
            <button onClick={onSearchBtn} >Search Employee</button>
            <div>
            {employees && employees.map((employee,index) =>{
                return (
                    <Employee key={employee._id} employee={employee}/>
                )
            })}
            </div>
        </div>
    )
}
export default Display;