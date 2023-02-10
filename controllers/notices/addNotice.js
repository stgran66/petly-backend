const { Notice } = require('../../models/notice');

const addNotice = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Notice.create({ ...req.body, owner });
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(201).json(result);
};

module.exports = addNotice;
