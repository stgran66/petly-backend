const { Notice } = require('../../models/notice');

const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;
  const result = await Notice.findById(noticeId);
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(result);
};

module.exports = getNoticeById;
