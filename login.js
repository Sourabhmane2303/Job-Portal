const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI_mydatabase);

const userSchema = new mongoose.Schema({

    email:String ,
    password:String
})

const User = mongoose.model("User",userSchema);


const app = express();
const PORT = 9000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Dummy database to store users (replace this with a real database in production)


// Login route
/*const loginHandler = async (req, res) => {
    const { email , password } = req.body;

   try
   {
      const user = await Use.findOne({email,password});

      if(user)
      {
        res.send("Login is Successfully");
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
};*/

app.post( "/login" , async (req, res) => {
  const { email , password } = req.body;

 try
 {
    const user = await User.findOne({email,password});

    if(user)
    {
      res.send("Login is Successfully");
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

});

// Serve login form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/login.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//module.exports = { loginHandler };
