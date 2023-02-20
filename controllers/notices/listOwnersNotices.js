const { Notice } = require('../../models/notice');

const listOwnersNotices = async (req, res, next) => {
  const { page = 1, limit = 12, query = '' } = req.query;
  const skip = (page - 1) * limit;
  const { id: owner } = req.user;
  const notices = await Notice.find(
    {
      owner,
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
  const allNotices = await Notice.find({
    owner,
    $or: [
      { comments: { $regex: query, $options: 'i' } },
      { title: { $regex: query, $options: 'i' } },
      { name: { $regex: query, $options: 'i' } },
      { breed: { $regex: query, $options: 'i' } },
      { place: { $regex: query, $options: 'i' } },
    ],
  });
  res.json({ notices, total: allNotices.length });
};

module.exports = listOwnersNotices;
