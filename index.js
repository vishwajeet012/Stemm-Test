// const app = require('./app');
// // Export the app as a Google Cloud Function
// exports.apiGateway = app;
const serverless = require('serverless-http');
const app = require('./app');

// Export the Lambda handler
module.exports.handler = serverless(app);
