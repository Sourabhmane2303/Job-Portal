const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { connectToDatabase } = require("./database")
const PORT = 3000;
const app = express();
const User = ("./register")
const mongoose = require("mongoose");
const url = process.env.MONGO_URI_DB

app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongodb");
}).catch((error) => {

    console.log("error in connecting the mongodb: ", error);
})

app.post("/register", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {

        const newUser = new User({ username, email, password })
        await newUser.save();


        console.log('Registration successful:', newUser);

        res.send('Registration successful!');
    }

    catch (error) {

        console.log("error occured:", error)
    }
})

//module.exports = {connectToDatabase};

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname + "/registration.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/login.html"))
});

app.get("/registration", (req, res) => {

    res.sendFile(path.join(__dirname + "/registration.html"))
})




app.listen(PORT, () => {

    console.log("The server is listening on port 3000")
})