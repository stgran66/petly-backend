const { User } = require('../../models/user');

const removeFavorite = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
  console.log(noticeId);
  await User.findByIdAndUpdate(owner, {
    $pull: { favorite: noticeId },
  });
  res.json(noticeId);
};

module.exports = removeFavorite;
