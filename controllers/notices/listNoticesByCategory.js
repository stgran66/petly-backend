const { Notice } = require('../../models/notice');

const listNotices = async (req, res, next) => {
  const { category } = req.params;
  console.log(category);
  res.json(await Notice.find({ category }));
};

module.exports = listNotices;
