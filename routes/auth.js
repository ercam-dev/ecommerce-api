const express = require('express');
const {
  register,
  login,
  resetPassword,
  updatePassword,
  logout
} = require('../controllers/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.put('/update-password', updatePassword);
router.get('/logout', logout);

module.exports = router;