const express = require('express');
const {
  register,
  login,
  resetPassword,
  updatePassword
} = require('../controllers/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);

module.exports = router;