const { User } = require('../models');

module.exports.findAllUsers = async (req, res) => {
  const limit = +req.query.limit || 1000000;
  const page = +req.query.page || 1;
  try {
    // Validate limit and page
    if (limit === NaN || limit <= 0) throw Error('Limit should be a number greater than zero');
    if (page === NaN || page <= 0) throw Error('Page should be a number greater than zero');
    
    const users = await User.findAndCountAll({ 
      offset: limit * (page - 1), 
      limit 
    });
    
    // Check if actual page is greater than total of pages
    const totalPages = Math.ceil(users.count / limit);
    if (page > totalPages) throw Error(`There are only ${totalPages} pages with the limit set to ${limit}`);

    const prevPage = page <= totalPages && page >= 2 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    res.status(200).send({ prevPage, nextPage, count: users.count, result: users.rows });
  } 
  catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports.findUserById = async (req, res) => {
  const { id } = req.params;
  try{
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).send(user);
    } throw Error('User not found');
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const user = await User.update({
      firstName, lastName
    }, {
      returning: true,
      where: { id }
    });
    res.status(200).json({ 
      message: 'User updated successfully', 
      user: user[1][0].dataValues 
    });
  } catch (err) {
    res.status(400).json('User could not be updated');
  }
}

module.exports.disableUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.update({
      active: false
    }, {
      returning: true,
      where: { id }
    });
    res.status(200).json({ 
      message: 'User disabled successfully', 
      user: user[1][0].dataValues 
    });
  } catch (err) {
    res.status(400).json('User could not be disabled');
  }
}

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } }
    );
    if (user) {
      res.status(200).json('User deleted successfully');
    } throw Error('User could not be deleted')
  } catch (err) {
    res.status(400).json(err.message);
  }
}

