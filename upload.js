const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require("path");
const app = express();
const port = 9000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create a schema for the file model
const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer
});

// Create a model based on the schema
const File = mongoose.model('File', fileSchema);

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/upload.html"))
})

// Route to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Create a new file document
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer
    });

    // Save the file to the database
    await newFile.save();

    res.send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to serve a file from the database
app.get('/file/:id', async (req, res) => {
  try {
    // Find the file by ID
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send('File not found');
    }

    // Send the file data
    res.set('Content-Type', file.contentType);
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
