//Require Express and import routers for Notes
const express = require('express');
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;