const { User } = require('../../models');

const updateUserData = async (req, res) => {
  const { _id } = req.user;
  const body = { ...req.body };
  const updUser = await User.findByIdAndUpdate(_id, body, {
    new: true,
  });
  if (!updUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json(updUser);
};

module.exports = updateUserData;
