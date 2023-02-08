const { User } = require('../../models/user');

const listFavorite = async (req, res, next) => {
  const { id: owner } = req.user;
  res.json(await User.findById(owner, 'favorite').populate('favorite'));
};

module.exports = listFavorite;
