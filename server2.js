const express = require('express');
const { MongoClient } = require('mongodb');
const path = require("path");


const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const client = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectDB();

// Define a middleware to fetch user profile
async function fetchUserProfile(req, res, next) {
  const { username } = req.params;

  try {
    const db = client.db('mydatabase');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    req.userProfile = user;
    next();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Express route for profile page
app.get('/profile/:username', fetchUserProfile, (req, res) => {
  const { username, skills } = req.userProfile;
  res.send(`
    <h1>User Profile</h1>
    <p>Username: ${username}</p>
    <p>Skills: ${skills.join(', ')}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
