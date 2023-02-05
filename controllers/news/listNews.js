const { News } = require('../../models/news');

const listNews = async (req, res, next) => {
  res.json(await News.find({}));
};

module.exports = listNews;
