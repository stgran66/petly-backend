const { ctrlWrapper } = require('../../helpers');

const listNotices = require('./listNoticesByCategory');
const getNoticeById = require('./getNoticeById');

module.exports = {
  listNotices: ctrlWrapper(listNotices),
  getNoticeById: ctrlWrapper(getNoticeById),
};
