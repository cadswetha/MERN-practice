const express= require('express')
const cors = require('cors')
const connectDB = require('./db')
connectDB()
const app = express()
app.use(express.json())
app.use(cors())

const Employees = require('./models/employee')

app.get('/api/employee', async(req,res)=>{
    await Employees.find({})
    .then(results =>{
        res.status(200).send(results)
    }).catch(errr=>{
        res.status(500).send({message:"Internal Server Error"})
    })
})

app.post('/api/employee' , async(req,res)=>{
    const employee = new Employees(req.body)
    await employee.save()
    .then(results =>{
        res.status(200).send(results)
    }).catch(err =>{
        if(err.code ===11000){
            res.status(400).send({message:"Duplicates found"})
        }
        else{
            res.status(500).send({message:"Internal Server Error"})
        }
    })
})

app.put('/api/employee' ,async(req,res)=>{
    await Employees.updateOne({email:req.body.email},{...req.body})
    .then(results =>{
        res.status(201).send({message: "Employee updated"})
    }).catch(err=>{
        res.status(500).send({message:"Internal Server Error"})
    })
})

app.delete('/api/employee'  , async(req,res)=>{
    await Employees.deleteOne({email:req.body.email})
    .then(results =>{
        res.status(201).send({message: "Employee deleted"})
    }).catch(err=>{
        res.status(500).send({message:"Internal Server Error"})
    })
})

app.listen(5000,()=>{
    console.log("backend running in port 5000");
})