const { Notice } = require('../../models/notice');
const { httpError } = require('../../helpers');

const listNotices = async (req, res, next) => {
  const { category } = req.params;
  if (
    category === 'sell' ||
    category === 'lost-found' ||
    category === 'for-free'
  ) {
    let notices = await Notice.find({ category });

    if (req.user) {
      notices = notices.map(notice => {
        return req.user.favorite.includes(notice._id)
          ? { ...notice, favorite: true }
          : { ...notice, favorite: false };
      });
    }

    return res.json(notices);
  }
  httpError(404);
};

module.exports = listNotices;
