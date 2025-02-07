const express = require('express');
const server = express();

server.use(express.json()) 

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// server.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(404).json({ message: 'Something went wrong!' })
// })

module.exports = server;
