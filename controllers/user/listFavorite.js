const { User } = require('../../models/user');

const listFavorite = async (req, res, next) => {
  const { id: owner } = req.user;
  res.json(await User.find({ owner }).populate('owner', 'favorite'));
};

module.exports = listFavorite;
