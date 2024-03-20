const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017";

const connectDB = async()=>{
    await mongoose.connect(mongoURI).then(
        res=>{
            console.log("DB connected")
        }
    ).catch(err=>{
        console.log("failed to connect DB")
    })
}

module.exports =connectDB;