'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Setup CORS
app.use(cors());

// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup Sequelize
const db = require('./db');
const { User, Course } = db.models;
const { OP } = db.Sequelize;
// global models
global.User = User;
global.Course = Course;
global.OP = OP;

// Authenticates if connection to database established
db.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

(async() => await db.sequelize.sync())();

// setup api routes
app.use('/api', routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
