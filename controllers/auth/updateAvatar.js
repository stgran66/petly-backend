const { User } = require('../../models');
const { cloudinaryUpload } = require('../../helpers');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path, filename } = req.file;

  const avatarURL = await cloudinaryUpload(filename, path);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAvatar;
