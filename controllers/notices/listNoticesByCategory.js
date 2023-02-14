const { Notice } = require('../../models/notice');

const listNotices = async (req, res, next) => {
  const { category } = req.params;
  if (
    category === 'sell' ||
    category === 'lost-found' ||
    category === 'for-free'
  ) {
    const notices = await Notice.find({ category });

    return res.json(notices);
  }
  next();
};

module.exports = listNotices;
