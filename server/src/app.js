const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cors = require('cors');

const api = require('./routes/api');

const app = express();
// middleware to automatically send and receive body as JSON input/output
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(morgan('combined')); // logging npm package with Apache server log combined output

app.use(express.json()); // checks for json Content-Type
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

// we add the * after main endpoint from the server
app.get('/*', (_req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
module.exports = app;