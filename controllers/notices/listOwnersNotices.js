const { Notice } = require('../../models/notice');

const listOwnersNotices = async (req, res, next) => {
  console.log('controller');
  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;
  const { id: owner } = req.user;
  const notices = await Notice.find({ owner }, {}, { skip, limit });
  const allNotices = await Notice.find({ owner });
  res.json({ notices, total: allNotices.length });
};

module.exports = listOwnersNotices;
