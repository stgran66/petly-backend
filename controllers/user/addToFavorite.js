const { User } = require('../../models/user');

const addToFavorite = async (req, res, next) => {
  const { noticeId } = req.params;

  await User.updateOne({
    $push: { favorite: noticeId },
  });
  res.json(noticeId);
};

module.exports = addToFavorite;
