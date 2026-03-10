const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init multer upload
const upload = multer({
  storage: storage
}).single('image');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to render the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/post10.html');
});

// Route to handle image upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send('Error uploading file.');
    } else {
      if (req.file == undefined) {
        res.send('No file selected.');
      } else {
        // Send back the URL of the uploaded image
        const imageUrl = '/uploads/' + req.file.filename;
        res.send(imageUrl);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
