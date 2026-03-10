const express = require('express');
const session = require('express-session');

const app = express();

// 🧠 Setup session middleware
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,  // 1 hour
    httpOnly: true,
    secure: false,    // set to true if using HTTPS
    sameSite: 'strict'
  }
}));

// ✅ Create session using GET
app.get('/login', (req, res) => {
  // Fake user session data
  req.session.user = { name: 'Sourabh' };
  res.send('Session created and stored in cookie!');
});





// 🔒 Protected route
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.name}!`);
  } else {
    res.status(401).send('Please login first.');
  }
});

app.get('/logout', (req, res) => {
  res.cookie('connect.sid', '', {
    maxAge: 1000,            // 1 second
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  });

  res.send('Session cookie replaced with blank for 1 second.');
});


// 🚪 Logout using GET


app.listen(3200, () => {
  console.log('Server running at http://localhost:3200');
});