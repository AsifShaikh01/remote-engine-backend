const mongoose = require("mongoose");

const clientSignupSchema = mongoose.Schema({
    name  :String,
    email : String,
    password : String
   
   

})

const ClientSignupModel = mongoose.model("client",clientSignupSchema);

module.exports={
    ClientSignupModel
}