
const mongoose = require("mongoose");
const session = require("express-session")

const express = require("express")
const app = express()
mongoose.connect(process.env.MONGO_URI_mydatabase);
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User',UserSchema)


app.use(session({
 
  secret:'secret123',
  resave: false,
  saveUninitialized: true
}))


const loginHandler = async (req, res) => {
    const { email , password } = req.body;

   try
   {
      const user = await User.findOne({email,password});

      if(user)
      {
        req.session.user = user 
        res.redirect("/dashboard")
        console.log("login is successfully")
      }

      else{
        res.status(401).send("invalid email or password");
      }
      
   }

   catch(error){
    console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
   }
};

app.get("/logout",(req,res)=>{

  req.session.destroy(err =>{
    res.redirect("/");
  })

})

module.exports = { loginHandler }