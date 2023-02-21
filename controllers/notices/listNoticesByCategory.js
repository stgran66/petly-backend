const { Notice } = require('../../models/notice');

const listNotices = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 12, query = '' } = req.query;
  const skip = (page - 1) * limit;
  if (
    category === 'sell' ||
    category === 'lost-found' ||
    category === 'for-free'
  ) {
    const allNotices = await Notice.find({
      category,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { breed: { $regex: query, $options: 'i' } },
      ],
    });
    const notices = await Notice.find(
      {
        category,
        $or: [
          { comments: { $regex: query, $options: 'i' } },
          { title: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } },
          { breed: { $regex: query, $options: 'i' } },
          { place: { $regex: query, $options: 'i' } },
        ],
      },
      {},
      { skip, limit }
    ).sort({
      createdAt: -1,
    });

    return res.json({
      notices,
      total: allNotices.length,
    });
  }
  next();
};

module.exports = listNotices;
