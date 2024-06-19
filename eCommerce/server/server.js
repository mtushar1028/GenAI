const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

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

// Handle addtocart POST request
app.post('/addtocart', (req, res) => {
  console.log('inside addtocart');
    // console.log(req.body);
  const { username, product_id, product_name, product_price} = req.body;

  if (!username || !product_id || !product_name || !product_price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert product data into the cart table
  const query = 'INSERT INTO cart (username, product_id, product_name, product_price) VALUES (?, ?, ?, ?)';
  
  // console.log(query);
  db.query(query, [username, product_id, product_name, product_price], (err, result) => {
    if (err) {
      console.error('Error inserting cart product data:', err);
      return res.status(500).json({ error: 'Failed to Add product to Cart' });
    }
    res.status(200).json({ message: 'Product Added to Cart successfully' });
  });
});



// Handle removetocart POST request
app.delete('/removetocart/:product_id/:username', (req, res) => {
  console.log('inside removetocart');
    // console.log(req.body);
    const product_id = req.params.product_id;
    const username = req.params.username;

  if (!username || !product_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert product data into the cart table
  const query =  `
  DELETE FROM cart 
  WHERE id = (
      SELECT id FROM (
          SELECT cart.id FROM cart 
          WHERE cart.product_id = ? AND cart.username = ?
          ORDER BY cart.id DESC
          LIMIT 1
      ) AS subquery
  );
`;
  
  // console.log(query);
  db.query(query, [product_id,username], (err, result) => {
    if (err) {
      console.error('Error deleting cart product data:', err);
      return res.status(500).json({ error: 'Failed to deleting product to Cart' });
    }
    res.status(200).json({ message: 'Product deleted from Cart successfully' });
  });
});

// Fetch cart data for a specific user
app.get('/cart/:username', (req, res) => {
  const { username } = req.params;
  const query = `
      SELECT ca.id as cart_id, ca.product_id, ca.product_name, ca.product_price
      FROM cart ca
      WHERE ca.username = ?
  `;
  db.query(query, [username], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
  });
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
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
