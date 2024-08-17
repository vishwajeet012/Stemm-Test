const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
};

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
