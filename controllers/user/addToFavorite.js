const { User } = require('../../models/user');

const addToFavorite = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;

  await User.findByIdAndUpdate(owner, {
    $push: { favorite: noticeId },
  });
  res.json(noticeId);
};

module.exports = addToFavorite;
