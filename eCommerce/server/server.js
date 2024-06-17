const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS Configuration
// const corsOptions = {
//     origin: 'http://localhost:3306',  // Update this with your client's origin
//     optionsSuccessStatus: 200
// };
app.use(cors()); 
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(compression());
// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecom',
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Handle registration POST request
app.post('/register', (req, res) => {
  console.log('inside reg');
  const { username, email, password, mobile } = req.body;

  if (!username || !email || !password || !mobile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert user data into the users table
  const query = 'INSERT INTO users (username, email, password, mobile) VALUES (?, ?, ?, ?)';
  db.query(query, [username, email, password, mobile], (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? and password= ?`;

  db.query(query, [username,password], (err, results) => {
      if (err) {
          console.error(err.message);
          return res.status(400).json({ error: err.message });
      }

      if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      const user = results[0];
      if (password==user.password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
      // if (bcrypt.compareSync(password, user.password)) {
      //     res.status(200).json({ message: 'Login successful' });
      // } else {
      //     res.status(401).json({ error: 'Invalid username or password' });
      // }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
