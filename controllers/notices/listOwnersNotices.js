const { Notice } = require('../../models/notice');

const listOwnersNotices = async (req, res, next) => {
  console.log('controller');
  const { id: owner } = req.user;
  res.json(await Notice.find({ owner }));
};

module.exports = listOwnersNotices;
