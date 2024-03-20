import { useState } from "react";

import '../App.css';
const Customer = (props)=>{
    const customer = props.customer
    return(
        <div className="customer-block">
            <p><b>Username: </b>{customer.username}</p>
            <p><b>Income: </b>{customer.income}</p>
            <p><b>Email: </b>{customer.email}</p>
            <p><b>Description: </b>{customer.description}</p>
            <div>
            <button>Update</button>
                <span><button>Delete</button></span>
            </div>
        </div>
    )
}
export default Customer;