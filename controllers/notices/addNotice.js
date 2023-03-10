const { Notice } = require('../../models/notice');
const { cloudinaryUpload } = require('../../helpers');
const gravatar = require('gravatar');

const addNotice = async (req, res, next) => {
  const { title: name } = req.body;
  const { path } = req.file;
  const { _id: owner, phone, email } = req.user;
  const avatarURL = path
    ? await cloudinaryUpload(name, path)
    : gravatar.url(req.body.name);
  const result = await Notice.create({
    ...req.body,
    imageUrl: avatarURL,
    owner,
    email,
    phone,
  });
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(201).json(result);
};

module.exports = addNotice;
