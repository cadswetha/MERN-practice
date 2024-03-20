import { useForm } from "react-hook-form"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Add = ()=>{
    const {register , handleSubmit , formState :{errors}} = useForm();
    const baseURL = "http://localhost:5000/api/customer"
    const [message,setMessage] = useState(null);
    const navigate = useNavigate();
    const onSubmit = async(data)=>{
        console.log(data);
        await fetch(baseURL , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(async(res)=>{
            data = await res.json();
            if(res.status===200){
                return data
            }
            else if(res.status===400){
                throw new Error(data.message)
            }
            else if(res.status===500){
                throw new Error(data.message)
            }
        })
        .then(results =>{
            console.log(results);
            setMessage('Customer Added!')
        }).catch(err=>{
            console.log(err)
            setMessage(err.message)
        })
    }
    const goBackHandler = ()=>{
        navigate('/');
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username: </label>
                <input name ="username" {...register("username")}/>
                <br/>
                <label>Income: </label>
                <input name ="income" {...register("income")}/>
                <br/>
                <label>Email: </label>
                <input name ="email" {...register("email",{
                    required: true,
                    validate:{
                        checkPattern: (value)=>{
                            return /^[^@\s]+@+[^@\s]+\.+([^@\s]{2,6})$/.test(value)
                        }
                    }
                    
                })}/>{errors.email && errors.email.type=== "required" && <p>Email is required!</p>}
                {errors.email && errors.email.type === "checkPattern" && <p>Email is not valid</p>}
                <br/>
                <label>Password: </label>
                <input type="password" name ="password" {...register("password",{
                    required:true,
                    validate:{
                        checkLength :(value)=>{
                            return value.length>=8
                        },
                        checkPassword:(value)=>{
                            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(value)
                        }
                    }
                })}/>
                {errors.password && errors.password.type=== "checkLength" && <p>Password length should be atleast 8</p>}
                {errors.password && errors.password.type === "checkPassword" && <p>Password must contain atleast one digit, lowercase, uppercase and a speacial char</p>}
                <br/>
                <label>Description: </label>
                <input name ="description" {...register("description")}/>
                <br/>
                <button type="submit">Add customer</button>
            </form>
            {message && (
                <h3>{message}</h3>
            )}
            <button onClick={goBackHandler}>Go back</button>

        </div>
    )
}

export default Add;