const mongoose =require("mongoose")

const {Schema}= mongoose;

const customerSchema= new Schema(
    {
        name:
        {
            type:String,
            required:true,
        },
        number:
        {
            type:String,
            required:true,
            unique:true

        },
        city:{
            type:String,
            required:true

        },
        state:
        {
            type:String,
            required:true
        },
        pincode:
        {
            type:String,
            required:true

        }
    }
);
const customer = mongoose.model('Customer',customerSchema);
module.exports =customer