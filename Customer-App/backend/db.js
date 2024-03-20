const mongoose =require("mongoose")
const mongoURI = "mongodb://127.0.0.1:27017/CustomerDatabase"
const connectToMongoose =()=>
{
    mongoose.connect(mongoURI);
}

module.exports = connectToMongoose;