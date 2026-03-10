const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
username:{

    type:String,
    required:true,
    unique:true,
    trim:true

},

email:{
type:String,
required:true,
trim:true,
unique:true

},

password:String


});

const User = mongoose.model("User",userSchema,'DR')



module.exports = User;
