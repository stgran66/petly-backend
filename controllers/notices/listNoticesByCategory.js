const { Notice } = require('../../models/notice');

const listNotices = async (req, res, next) => {
  const { category } = req.params;
  if (
    category === 'sell' ||
    category === 'lost-found' ||
    category === 'for-free'
  ) {
    res.json(await Notice.find({ category }));
  }
  next();
};

module.exports = listNotices;
