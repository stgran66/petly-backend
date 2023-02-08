const { ctrlWrapper } = require('../../helpers');
const addToFavorite = require('./addToFavorite');
const getUserData = require('./getUserData');
const listFavorite = require('./listFavorite');
module.exports = {
  addToFavorite: ctrlWrapper(addToFavorite),
  getUserData: ctrlWrapper(getUserData),
  listFavorite: ctrlWrapper(listFavorite),
};
