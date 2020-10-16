const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { sendResetPasswordMail } = require('../middlewares/nodemailer');

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
// create random token
const createUserToken = () => crypto.randomBytes(32).toString('base64');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createJWT = (user) => {
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
      token: createUserToken(),
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = createJWT(user);
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: maxAge * 1000 
    });

    res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }       
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const auth = bcrypt.compareSync(password, user.password);
      if (auth) {
        const token = createJWT(user);
        res.cookie('jwt', token, { 
          httpOnly: true, 
          maxAge: maxAge * 1000 
        });
        res.status(200).json({ message: "logged in successfully", user });
      } else {
        res.status(401).json('incorrect password');
      }
    } else {
      res.status(401).json('incorrect email');
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      // send email to reset password
      await sendResetPasswordMail(email, user.id, user.token);
      res.status(200).json('email sent successfully');
    } else {
      res.status(401).json('email is not registered');
    }
  } catch (error) {
    res.status(400).json('email could not be sent');
  }
}

const updatePassword = async (req, res) => {
  const { id, token, password } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      if (user.token === token) {
        const hash = bcrypt.hashSync(password);

        const updatedUser = await User.update({
          password: hash,
          token: createUserToken(),
          updatedAt: new Date()
        }, { 
          returning: true,
          where: { id }
        });

        return res.status(200).json({ message: 'password updated successfully', user: updatedUser});
      } throw Error('incorrect token');
    } throw Error('user not found');
  } catch (error) {
    res.status(400).json( error.message );
  }
}

module.exports = {
  register,
  login,
  resetPassword,
  updatePassword
};