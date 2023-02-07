const { ctrlWrapper } = require('../../helpers');
const addToFavorite = require('./addToFavorite');
const getUserData = require('./getUserData');

module.exports = {
  addToFavorite: ctrlWrapper(addToFavorite),
  getUserData: ctrlWrapper(getUserData),
};
