const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

// listening to requests
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${ process.env.PORT }`);
});