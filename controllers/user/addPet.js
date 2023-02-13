const { Pet } = require('../../models');
const { User } = require('../../models');
const gravatar = require('gravatar');
const { cloudinaryUpload } = require('../../helpers');

const addPet = async (req, res) => {
  const { name } = req.body;
  const { path } = req.file;

  const { _id: owner } = req.user;

  const avatarURL = path
    ? cloudinaryUpload(name, path)
    : gravatar.url(req.body.name);

  const result = await Pet.create({
    ...req.body,
    photo: avatarURL,
    owner,
  });

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  await User.findByIdAndUpdate(owner, {
    $push: { pets: result._id },
  });

  res.status(201).json(result);
};

module.exports = addPet;
