const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// import routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const port = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

// routers
app.use('/api/v1/users', authRouter);
app.use('/api/v1/users', userRouter);

// listening to requests
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});