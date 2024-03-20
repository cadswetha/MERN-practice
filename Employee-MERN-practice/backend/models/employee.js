const mongoose = require("mongoose")
const {Schema} = mongoose

const employeeSchema = new Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    age:{
        required:true,
        type:String
    }
})
module.exports = mongoose.model('Employees',employeeSchema);