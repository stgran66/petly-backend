const { ctrlWrapper } = require('../../helpers');
const addToFavorite = require('./addToFavorite');

module.exports = {
  addToFavorite: ctrlWrapper(addToFavorite),
};
