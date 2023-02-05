const { ctrlWrapper } = require('../../helpers');

const listNews = require('./listNews');

module.exports = {
  listNews: ctrlWrapper(listNews),
};
