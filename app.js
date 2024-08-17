const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
require('dotenv').config();
const db = require('./config/db'); 
const routes = require('./routes/route');

const port = process.env.PORT || 8080;

app.use(helmet());

// Enable CORS
app.use(cors());

app.set('trust proxy', true);




const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again la ter.',
});
app.use(express.json());

app.use(limiter);

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

