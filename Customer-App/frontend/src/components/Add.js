import { useState } from "react";

const Add = (props) =>{
    const [name,setName] = useState('');
    const [number,setNumber] = useState('');
    const [city,setCity] = useState('');
    const [statee,setStatee] = useState('');
    const [pincode,setPincode] = useState('');
    const baseURL = 'http://localhost:8080/api/customer'

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        await fetch(baseURL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                'name':name,
                'number':number,
                'city':city,
                'state':statee,
                'pincode':pincode
            })
        }).then(res =>{ 
            if(res.status === 200)
                return res.json();
            else{
                throw new Error('Duplicate number')
            }
        })
        .then(res => {
            console.log(res);
            props.setFormVisible(false);
            props.setMessage(res.message);
        })
        .catch(err =>{ 
            console.log(`My error ---- ${err}`);
            props.setMessage('Cant add same number again')
        });
    }
    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <label for='Cname'>Name:</label>
                <input name ='Cname' value = {name} onChange={e => setName(e.target.value)}/>
                <br/>
                <label for='Cnumber'>Number:</label>
                <input name ='Cnumber' value = {number} onChange={e => setNumber(e.target.value)}/>
                <br/>
                <label for='Ccity'>City:</label>
                <input name ='Ccity' value = {city} onChange={e => setCity(e.target.value)}/>
                <br/>
                <label for='Cstatee'>State:</label>
                <input name ='Cstatee' value = {statee} onChange={e => setStatee(e.target.value)}/>
                <br/>
                <label for='Cpincode'>Pincode:</label>
                <input name ='Cpincode' value = {pincode} onChange={e => setPincode(e.target.value)}/>
                <br/>
                <button type="submit">Add Customer</button>
            </form>
        </div>
    )

}
export default Add;