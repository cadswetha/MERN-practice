const express= require("express");
const connectToMongoose = require("./db");
connectToMongoose();
const app= express();
const cors= require("cors");
app.use(cors());
app.use(express.json());
port=8080;

const customer = require("./models/customer")
//getting customer details
app.get('/api/customer',async(req,res)=>
{
    try{
         const customers = await customer.find({})
         res.status(200).send(customers)
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
});
//creating a customer
app.post('/api/customer',async(req,res)=>
{
    const {name,number,city,state,pincode} =req.body;
    const cust = new customer({
        name:name,number:number,city:city,state:state,pincode:pincode
    })
    try{
        await cust.save()
        res.status(200).json({message:"successfully added"})
    }
    catch(err)
    {
        res.status(400).send({error:'Duplicate number'});
    }
});
//updating customer details
app.put('/api/customer',async(req,res)=>
{
    //?????just check once y with parameter in the route is not working in this case
    // const {number}= req.params.number;
    const {name,number,city,state,pincode} = req.body
    try{
        await customer.updateOne({number:number},{city:city,state:state,pincode:pincode});
        res.status(200).json({message:"updated successfully"})
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
});
//deleting customer 
app.delete('/api/customer', async(req,res)=>
{
     //?????just check once y with parameter in the route is not working in this case
    const number=req.body.number
    try{
            await customer.deleteOne({number:number})
            res.status(200).json({message:"deleted successfully"})
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
});

app.get('/api/customer/:name',async(req,res)=>
{
    const {name}=req.params;
    try{
        const customers= await customer.find({name:name})
        res.status(200).send(customers);
    }
    catch(e)
    {
        res.status(400).json({error:e})
    }
})

app.listen(port,()=>
{
    console.log("backend connected!!")
});