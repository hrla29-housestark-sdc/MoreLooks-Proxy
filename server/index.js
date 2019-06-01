const express = require('express');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Creating server and port number
const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serves static HTML file
app.use(express.static(path.join(__dirname, '../client')));

// Proxy router to handle all routes
app.use('/', proxy({
  target: 'localhost:3000',
  router: {
    '/navbar': 'http://localhost:3001',
    '/productDescription': 'http://localhost:3002',
    '/morelooks': 'http://localhost:3003',
    '/reviews': 'http://localhost:3004'
  }
}))

// Verifies and sets port on where server is listens at
app.listen(port, () => console.log(`Listening on proxy port ${port}!`));