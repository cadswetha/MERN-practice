const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
connectDB()

const Customers = require('./models/customer')

const app = express()
app.use(express.json())
app.use(cors())
const port = 5000

//get all customers
app.get('/api/customer',async(req,res) =>{
    await Customers.find({})
    .then((customers)=>{
        if(customers.length>0){
            res.status(200).send(customers);
        }
        else{
            res.status(404).json({message:"No customers found"})
        }
    }).catch(err =>{ 
        console.log(err);
        res.status(500).send({message: "Internal Server error"})
    })
})

//get customer by username

app.get('/api/customer/:username' , async(req,res) => {
    await Customers.findOne({username:req.params.username})
    .then(results =>{
        if(results){
            res.status(200).send(results);
        }
        else{
            res.status(404).json({message:"No documents found"})
        }
    }).catch(err => res.status(500).send({message:"Internal server error"}));
})

//add customer
app.post('/api/customer' ,async(req,res) =>{
    const customer = new Customers({
        ...req.body
    })
    customer.save().then(results =>{
        res.status(200).send(results);
    }).catch(err => {
        if(err.code === 11000){
         res.status(400).send({message:"Duplicates found!"})
        }
        else{
            res.status(500).send({message:"Internal server error"})
        }
    })
})

//edit customer by username
app.put('/api/customer',async(req,res)=>{
    Customers.updateOne({username:req.body.username}, {...req.body})
    .then(results =>{
        res.status(201).send({message:"Document updated!"})
    }).catch(err => res.status(500).send({message:"Internal server error"}));
})

//delete cusomer by username
app.delete('/api/customer',async(req,res)=>{
    Customers.deleteOne({username:req.body.username})
    .then(()=>{
        res.status(201).send({message:"Document deleted!"})
    }).catch(err => res.status(500).send({message:"Internal server error"}));
})

app.listen(port, ()=>{
    console.log("backend running in port 5000");
})