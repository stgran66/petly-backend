const { User } = require('../../models');
const gravatar = require('gravatar');
const { cloudinaryUpload } = require('../../helpers');

const addPet = async (req, res, next) => {
  const { name } = req.body;
  const { path } = req.file;

  const { _id: owner } = req.user;

  const avatarURL = path ? cloudinaryUpload(name, path) : gravatar.url(req.body.name);

  await User.findByIdAndUpdate(owner, {
    $push: { pets: { ...req.body, photo: avatarURL } },
  });

  res.json(req.body);
};

module.exports = addPet;
