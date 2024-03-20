const DisplayCustomers =(props) =>{
    const customers = props.data;
    const baseURL = 'http://localhost:8080/api/customer'
    const onDeleteHandler = async(number) =>{
        await fetch(baseURL,{
            method : 'DELETE',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                "number": number
            })
        }).then(ress=>ress.json())
        .then(res=>{
            console.log(res);
            props.setDisplayVisible(false);
            props.setMessage('Deleted Successfully');
        }).catch(err=>console.log(err))
    }
    return (
        <div>{
            customers.map((customer,index) => {
                return (
                    <div key={customer.number} >
                        <h4>Name : {customer.name}</h4>
                        <h4>Number: {customer.number}</h4>
                        <h4>City: {customer.city}</h4>
                        <h4>State: {customer.state}</h4>
                        <h4>Pincode: {customer.pincode}</h4>
                        <button onClick={()=>onDeleteHandler(customer.number)}>Delete</button>
                    </div>
                );
            })
        }
        </div>
    )
}

export default DisplayCustomers;
