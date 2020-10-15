const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }, process.env.JWT_SECRET, {
    expiresIn: '1hr'
  });
}

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  console.log(req.body);

  try {
    const hash = bcrypt.hashSync(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = createToken(user);
    res.cookie('jwt', token, { 
      // httpOnly: true, 
      maxAge: maxAge * 1000 
    });

    res.status(201).json({ message: "Se ha agregado el usuario satisfactoriamente", user });

  } catch (error) {
    console.error(error.message);
  }
}

const login = async (req, res) => {
  try {
    res.json('login');
  } catch (error) {
    console.error(error.message);
  }
}

const resetPassword = async (req, res) => {
  try {
    res.json('reset-password');
  } catch (error) {
    console.error(error.message);
  }
}

const updatePassword = async (req, res) => {
  try {
    res.json('update-password');
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  register,
  login,
  resetPassword,
  updatePassword
};