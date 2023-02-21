const { User } = require('../../models');

const getUserData = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id, { password: 0, token: 0 }).populate(
    'pets'
  );

  res.status(200).json({ user });
};

module.exports = getUserData;
