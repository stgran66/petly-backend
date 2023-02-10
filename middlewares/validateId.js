const mongoose = require('mongoose');
const { httpError } = require('../helpers');

const validateId = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.isValidObjectId(id)) {
    next(httpError(404));
  }
  next();
};

module.exports = validateId;
