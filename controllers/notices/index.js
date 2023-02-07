const { ctrlWrapper } = require('../../helpers');

const listNotices = require('./listNoticesByCategory');
const getNoticeById = require('./getNoticeById');
const addToFavorite = require('../user/addToFavorite');

module.exports = {
  listNotices: ctrlWrapper(listNotices),
  getNoticeById: ctrlWrapper(getNoticeById),
  addToFavorite: ctrlWrapper(addToFavorite),
};
