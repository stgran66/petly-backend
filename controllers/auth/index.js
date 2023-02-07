const { ctrlWrapper } = require('../../helpers');

const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const updateAvatar = require('./updateAvatar');
const updateUserData = require('./updateUserData');

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUserData: ctrlWrapper(updateUserData),
};
