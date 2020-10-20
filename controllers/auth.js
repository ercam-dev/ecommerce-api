const crypto = require('crypto');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { sendResetPasswordMail } = require('../middlewares/nodemailer');

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' };
  
  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.name === 'SequelizeUniqueConstraintError') {
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation errors
  if (err.name === 'SequelizeValidationError') {
    let { path, message } = err.errors[0];
    errors[path] = message; 
  }

  return errors;
}
// create random token for user
const createUserToken = () => crypto.randomBytes(32).toString('base64');

// create json web token
const maxAge = 3 * 24 * 60 * 60; // 3 days
const createJWT = (user) => {
  return jwt.sign({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

module.exports.register = async (req, res) => { 
  const { firstName, lastName, email, password } = req.body;
  
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      token: createUserToken(),
      password
    });
    const token = createJWT(user);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: "user created successfully", user });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }       
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createJWT(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: "logged in successfully", user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      // send email to reset password
      await sendResetPasswordMail(email, user.id, user.token);
      res.status(200).json('email sent successfully');
    } else {
      res.status(401).json('That email is not registered');
    }
  } catch (error) {
    res.status(400).json('email could not be sent');
  }
}

module.exports.updatePassword = async (req, res) => {
  const { id, token, password } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      if (user.token === token) {
        const updatedUser = await User.update({
          password,
          token: createUserToken()
        }, { 
          returning: true,
          where: { id }
        });
        return res.status(200).json({ message: 'password updated successfully', user: updatedUser});
      } throw Error('incorrect token');
    } throw Error('user not found');
  } catch (err) {
    res.status(400).json( err.message );
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json('Logged out successfully');
  // res.redirect('/');
}