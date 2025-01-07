// Requirements:
// 1. Create a simple web server using Node.js.
// 2. The server should respond to requests with a simple "Hello, world!" message.
// 3. The server should listen on port 3000.

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const router = require('./routes/index.js');

app.use('/', router);

app.listen(process.env.PORT || 3000);
console.log(`Server running at http://${hostname}:${process.env.PORT || port}/`);