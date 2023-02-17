const { User } = require('../../models/user');

const listFavorite = async (req, res, next) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;
  res.json(
    await User.findById(owner, 'favorite').populate({
      path: 'favorite',
      options: { skip: skip, limit: limit },
    })
  );
};

module.exports = listFavorite;
