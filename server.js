const express = require('express');
const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
server.use(express.json());
server.use(logger);
server.use(addName);
server.use('/users', userRouter);
server.use('/posts', postRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
//custom middleware
function addName(req, res, next) {
  req.name = req.name || 'Dave';
  next();
}
function logger(req, res, next) {
  req.time = Date.now();
  console.log(`${req.method} to ${req.originalUrl} made at ${req.requestTime}`);
  next();
}
module.exports = server;