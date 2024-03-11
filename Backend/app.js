const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
}));

// Routes
const usersRoutes = require('./api/routes/users');
app.use('/user', usersRoutes);

// Home page route
app.get('/', (req, res) => {
  const localTime = new Date().toLocaleTimeString();
  res.status(200).send(`Hello gigel user! Server started at ${localTime}.`);
});

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error('This route is not available. Please go back to the home page.');
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
