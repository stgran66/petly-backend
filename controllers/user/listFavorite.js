const { User } = require('../../models/user');

const listFavorite = async (req, res, next) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const userFavoriteNotices = await User.findById(owner, 'favorite')
    .populate({
      path: 'favorite',
      options: { skip: skip, limit: limit },
    })
    .sort({
      createdAt: -1,
    });
  const totalUserFavorite = await User.findById(owner, 'favorite').populate({
    path: 'favorite',
  });
  res.json({
    notices: userFavoriteNotices.favorite,
    total: totalUserFavorite.favorite.length,
  });
};

module.exports = listFavorite;
