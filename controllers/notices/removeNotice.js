const { Notice } = require('../../models/notice');

const removeNotice = async (req, res, next) => {
  const { noticeId } = req.params;
  const result = await Notice.findByIdAndRemove(noticeId);
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ message: 'contact deleted' });
};

module.exports = removeNotice;
