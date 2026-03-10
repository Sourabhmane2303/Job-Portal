const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser")

const app = express();
//const port = 9000;


mongoose.connect('process.env.MONGO_ATLAS_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+"/form.html"))
})

// Define a schema for your data
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  birthdate: Date,
  resume: String,
  comments: String
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint to receive POST requests
app.post('/submit', async (req, res) => {
  try {
    // Create a new document with the received data
    const newData = new Data({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      birthdate: req.body.birthdate,
      resume: req.body.resume,
      comments: req.body.comments
    });

    // Save the document to MongoDB
    await newData.save();
    
    res.sendFile(path.join(__dirname+"/submit.html"));
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

// Start the server
//.listen(port, () => console.log(`Server running on http://localhost:${port}`));
 