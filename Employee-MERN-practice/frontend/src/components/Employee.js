import { useNavigate } from "react-router-dom"

const Employee = (props) =>{
    const employee = props.employee
    const navigate  = useNavigate();
    const baseURL = "http://localhost:5000/api/employee"

    const updateHandler = ()=>{
        navigate("/update", {state:employee})
    }
    const deleteHandler = async(email)=>{
        await fetch(baseURL,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "email":email
            })
        }).then(res => res.json())
        .then(results => console.log(results))
        .catch(err => console.log(err));
    }
    return(
        <div>
            <p><b>Email: </b>{employee.email}</p>
            <p><b>Password: </b>{employee.password}</p>
            <p><b>Age: </b>{employee.age}</p>
            <div>
                <span><button onClick={updateHandler}>Update</button></span>
                <span><button onClick={() => deleteHandler(employee.email)}>Delete</button></span>
            </div>
        </div>
    )
}
export default Employee