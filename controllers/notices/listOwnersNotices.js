const { Notice } = require('../../models/notice');

const listOwnersNotices = async (req, res, next) => {
  console.log('controller');
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { id: owner } = req.user;
  res.json(await Notice.find({ owner }, {}, { skip, limit }));
};

module.exports = listOwnersNotices;
