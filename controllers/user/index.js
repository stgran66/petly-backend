const { ctrlWrapper } = require('../../helpers');
const addToFavorite = require('./addToFavorite');
const listFavorite = require('./listFavorite');

module.exports = {
  addToFavorite: ctrlWrapper(addToFavorite),
  listFavorite: ctrlWrapper(listFavorite),
};
