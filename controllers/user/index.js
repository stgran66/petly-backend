const { ctrlWrapper } = require('../../helpers');
const addToFavorite = require('./addToFavorite');
const getUserData = require('./getUserData');
const listFavorite = require('./listFavorite');
const addPet = require('./addPet');
const deletePet = require('./deletePet');
const removeFavorite = require('./removeFavorite');

module.exports = {
  addToFavorite: ctrlWrapper(addToFavorite),
  getUserData: ctrlWrapper(getUserData),
  listFavorite: ctrlWrapper(listFavorite),
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
  removeFavorite: ctrlWrapper(removeFavorite),
};
