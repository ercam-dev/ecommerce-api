const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.error(err.name, err.message, err.errors);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.name === 'SequelizeUniqueConstraintError') {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: '1hr'
  });
}

const register = async (req, res) => { 
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    console.log(req.body);

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
      httpOnly: true, 
      maxAge: maxAge * 1000 
    });

    res.status(201).json({ message: "Se ha agregado el usuario satisfactoriamente", user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }       
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      const auth = bcrypt.compareSync(password, user.password);
      if (auth) {
        const token = createToken(user);
        res.cookie('jwt', token, { 
          httpOnly: true, 
          maxAge: maxAge * 1000 
        });
        res.status(200).json({ message: "Se ha iniciado sesión satisfactoriamente", user });
      } else {
        res.status(401).json('incorrect password');
      }
    } 
    else {
      res.status(401).json('incorrect email');
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

const resetPassword = async (req, res) => {
  res.json('reset-password');
}

const updatePassword = (req, res) => {
  res.json('update-password')
}

module.exports = {
  register,
  login,
  resetPassword,
  updatePassword
};