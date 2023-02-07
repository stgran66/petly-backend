const { ctrlWrapper } = require('../../helpers');

const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
