const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const actionRouter = require('./data/helpers/actionRouter.js');
const projectRouter = require('./data/helpers/projectRouter');

const server = express();

server.use(express.json());

server.use('/actions', actionRouter);
server.use('/projects', projectRouter);
server.use(helmet());
server.use(morgan('dev'));
// server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Good Luck!</h2>`)
});

// function logger(req, res, next) {
//   console.log(`${req.method} Request Date.now()`);
//   next();
// };

module.exports = server;