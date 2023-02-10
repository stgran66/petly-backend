const { Notice } = require('../../models/notice');

const listOwnersNotices = async (req, res, next) => {
  const { id: owner } = req.user;
  res.json(await Notice.find({ owner }));
};

module.exports = listOwnersNotices;
