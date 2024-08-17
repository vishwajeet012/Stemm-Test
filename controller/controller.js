require('dotenv').config();
const User = require('../Model/user');
const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema } = require('../validator/validator');
const { generateToken } = require('../middleware/middleware');

// Register route
const registerUser = async (req, res) => {
    const { username, password } = req.body;
  
    // Validate request body
    const { error } = registerSchema.validate({ username, password });
    if (error) {
      console.error(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({ msg: error.details[0].message });
    }
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.error(`Username already exists: ${username}`);
        return res.status(400).json({ msg: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(`Server error during registration: ${err.message}`);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  

  
// Login route
 const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
 // Validate request body
 const { error } = loginSchema.validate({ username, password });
 if (error) return res.status(400).json({ msg: error.details[0].message });

 try {
   // Find the user by username
   const user = await User.findOne({ username });
   if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

   // Check if the password is correct
   const isMatch = await user.comparePassword(password);
   if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

   // Generate JWT token
   const token = generateToken(user);

   res.json({ token });
    } catch (err) {
        console.error(err);  // Log the error for debugging
      res.status(500).json({ msg: 'Server error' });
    }
  };

  const welcome = (req, res) => {
    res.json({ message: 'Welcome to the API Gateway!' });
  };

  const description = (req, res) => {
    res.json({ message: 'description to the API Gateway!' });
  };

// app.get('/welcome', (req, res) => {
//     res.send('Welcome to the API Gateway!');
//   });
  
//   app.get('/description', authenticateJWT, (req, res) => {
//     res.send('This is description to the API Gateway!');
//   });

module.exports = {
    registerUser,
    loginUser,
    welcome,
    description
};