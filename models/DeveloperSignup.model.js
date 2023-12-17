const mongoose = require("mongoose");

const developerSignupSchema = mongoose.Schema({
    name  :String,
    email : String,
    password : String
   
   

})

const DeveloperSignupModel = mongoose.model("developer",developerSignupSchema);

module.exports={
    DeveloperSignupModel
}