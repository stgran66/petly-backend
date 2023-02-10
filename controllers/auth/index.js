const { ctrlWrapper } = require('../../helpers');

const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
