const { User } = require('../../models/user');

const addToFavorite = async (req, res, next) => {
  const { noticeId } = req.params;

  const result = await User.updateOne({ $push: { favorite: noticeId } });
  res.json(result);
};

module.exports = addToFavorite;
