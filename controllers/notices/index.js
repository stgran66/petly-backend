const { ctrlWrapper } = require('../../helpers');

const listNotices = require('./listNoticesByCategory');
const getNoticeById = require('./getNoticeById');
const addNotice = require('./addNotice');
const listOwnersNotices = require('./listOwnersNotices');
const removeNotice = require('./removeNotice');

module.exports = {
  listNotices: ctrlWrapper(listNotices),
  getNoticeById: ctrlWrapper(getNoticeById),
  addNotice: ctrlWrapper(addNotice),
  listOwnersNotices: ctrlWrapper(listOwnersNotices),
  removeNotice: ctrlWrapper(removeNotice),
};
