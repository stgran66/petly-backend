const { Notice } = require('../../models/notice');

const listOwnersNotices = async (req, res, next) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const { id: owner } = req.user;
  const notices = await Notice.find({ owner }, {}, { skip, limit }).sort({
    createdAt: -1,
  });
  const allNotices = await Notice.find({ owner });
  res.json({ notices, total: allNotices.length });
};

module.exports = listOwnersNotices;
