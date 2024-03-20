import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add = () =>{
    const { register, handleSubmit ,formState:{errors}} = useForm()
    const baseURL = "http://localhost:5000/api/employee"
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const onSubmit = async(data) =>{
        console.log(data);
        await fetch(baseURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(async(res)=>{
            const data = await res.json()
            if(res.status === 200){
                return data;
            }
            else{
                throw new Error("error")
            }
        })
        .then(rseults =>{
            console.log(rseults);
            setMessage('customer added');
        }).catch(err =>{
            console.log(err);
            setMessage('Error occured!')
        })
    }
    const goBackHandler =()=>{
        navigate("/")
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email: </label>
                <input name="email" {...register("email",{
                    required:true,
                    validate:{
                        checkPattern:(value)=>{
                            return /^[^@\s]+@+[^@\s]+\.+([^@\s]{2,6})$/.test(value)
                        }
                    }
                })}/>
                {errors.email && errors.email.type === "required" && <p>Email is required</p>}
                {errors.email && errors.email.type === "checkPattern" && <p>Invalid email format</p>}<br></br>
                <label>Password: </label>
                <input name = "password" {...register("password",{
                    required:true,
                    validate:{
                        checkPattern:(value)=>{
                            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$&*])[a-zA-Z\d@#$&*]{8,}$/.test(value)
                        }
                    }
                })} />
                {errors.password && errors.password.type === "required" && <p>Password is required</p>}
                {errors.password && errors.password.type === "checkPattern" && <p>Invalid password format</p>}
                <br/>
                <label>Age: </label>
                <input type="number" name ="age" {...register("age",{
                    required:true,
                    min:15,
                    max:70
                })}/>
                {errors.age && errors.age.type === "required" && <p>Age is required</p>}
                {errors.age && errors.age.type === "min" && <p>Age min must be 15</p>}
                {errors.age && errors.age.type === "max" && <p>Age max must be 70</p>}
                <br/>
                <button type="submit">Add employee</button>
            </form>
            <p>{message}</p>
            <button onClick={goBackHandler}>Go back</button>
        </div>
    )
}
export default Add;