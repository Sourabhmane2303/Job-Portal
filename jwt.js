const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const express = require("express")
const session = require("express-session")
const app = express()
const { json } = require("body-parser")
app.use(cookieParser())
app.use(json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge:60000}
}))




const secret = "abc123"




app.get("/login",(req,res)=>{

   const user = { id:1,username:"GFG"}
    const token = jwt.sign(user, secret, { expiresIn: '1h' });

       res.json({
         token
       })


  res.send('Logged in and token stored in cookie!');

})


    app.get("/logout", (req, res) => {
        req.session.destroy(error => {
            if (error) {
                console.error("Error destroying session:", error);
                return res.status(500).json({ message: "Logout failed!" });
            }
            // Optional: Clear the session cookie from the client's browser
            res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
            res.json({ message: "Logged out successfully!" });
        });
    });




app.listen(3500,(req,res)=>{

    console.log("The port is listening on the port 3500")
   
})