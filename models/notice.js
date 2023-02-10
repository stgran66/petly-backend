const { Schema, model } = require('mongoose');
const Joi = require('joi');

const noticeSchema = new Schema({
  title: {
    type: String,
  },
  breed: {
    type: String,
  },
  place: {
    type: String,
  },
  age: {
    type: String,
  },
  price: {
    type: String,
  },
  name: {
    type: String,
  },
  birthday: {
    type: String,
  },
  sex: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    enum: ['sell', 'lost-found', 'for-free'],
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
});

const addNoticeValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    breed: Joi.string().required(),
    place: Joi.string().required(),
    price: Joi.string().required(),
    age: Joi.string().required(),
    name: Joi.string().required(),
    birthday: Joi.string().required(),
    sex: Joi.string().required(),
    imageUrl: Joi.string().required(),
    category: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }
  next();
};

const schemas = {
  addNoticeValidation,
};

const Notice = model('notice', noticeSchema);

module.exports = {
  Notice,
  schemas,
};
