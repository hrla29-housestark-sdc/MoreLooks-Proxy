const express = require('express');
const proxy = require('http-proxy-middleware');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Creating server and port number
const app = express();
const port = 3000;

// Middleware
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serves static HTML file
app.use(express.static(path.join(__dirname, '../client')));

// Proxy router to handle all routes
app.use('/', proxy({
  target: 'ec2-3-14-5-216.us-east-2.compute.amazonaws.com',
  router: {
    '/navbar': 'http://ec2-54-153-22-73.us-west-1.compute.amazonaws.com/navbar/mongo/search/9000000',
    '/productDescription': 'http://ec2-18-188-70-40.us-east-2.compute.amazonaws.com',
    '/morelooks': 'http://ec2-18-191-169-48.us-east-2.compute.amazonaws.com/morelooks/api',
    '/reviews': 'http://ec2-18-191-154-4.us-east-2.compute.amazonaws.com/api/reviews'
  }
}))

// Verifies and sets port on where server is listens at
app.listen(port, () => console.log(`Listening on proxy port ${port}!`));