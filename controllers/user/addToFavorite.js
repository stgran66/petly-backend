const { User } = require('../../models/user');

const addToFavorite = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;

  const user = await User.findById(owner);
  user.favorite.includes(noticeId) &&
    res.status(400).json({ message: 'notice already in favorite' });

  await User.findByIdAndUpdate(owner, {
    $addToSet: { favorite: noticeId },
  });
  res.json(noticeId);
};

module.exports = addToFavorite;
