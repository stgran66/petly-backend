const { User } = require('../../models/user');

const listFavorite = async (req, res, next) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 12, query = '' } = req.query;
  const skip = (page - 1) * limit;

  const userFavoriteNotices = await User.findById(owner, 'favorite')
    .populate({
      path: 'favorite',
      match: {
        $or: [
          { comments: { $regex: query, $options: 'i' } },
          { title: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } },
          { breed: { $regex: query, $options: 'i' } },
          { place: { $regex: query, $options: 'i' } },
        ],
      },
      options: { skip: skip, limit: limit },
    })
    .sort({
      createdAt: -1,
    });
  const totalUserFavorite = await User.findById(owner, 'favorite').populate({
    path: 'favorite',
    match: {
      $or: [
        { comments: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
        { breed: { $regex: query, $options: 'i' } },
        { place: { $regex: query, $options: 'i' } },
      ],
    },
  });
  res.json({
    notices: userFavoriteNotices.favorite,
    total: totalUserFavorite.favorite.length,
  });
};

module.exports = listFavorite;
