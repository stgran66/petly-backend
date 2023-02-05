const { ctrlWrapper } = require('../../helpers');

const listServices = require('./listServices');

module.exports = {
  listServices: ctrlWrapper(listServices),
};
