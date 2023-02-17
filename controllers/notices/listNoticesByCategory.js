const { Notice } = require('../../models/notice');

const listNotices = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;
  if (
    category === 'sell' ||
    category === 'lost-found' ||
    category === 'for-free'
  ) {
    const allNotices = await Notice.find({ category });
    const notices = await Notice.find({ category }, {}, { skip, limit });

    return res.json({
      notices,
      total: allNotices.length,
    });
  }
  next();
};

module.exports = listNotices;
