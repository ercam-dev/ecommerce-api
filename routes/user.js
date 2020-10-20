const express = require('express');
const {
  findAllUsers,
  findUserById,
  updateUser,
  disableUser,
  deleteUser
} = require('../controllers/user')
const router = express.Router();

router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.put('/:id', updateUser);
router.put('/:id', disableUser);
router.delete('/:id', deleteUser);

module.exports = router;
