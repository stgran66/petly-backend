const { Schema, model } = require('mongoose');
const Joi = require('joi');

const noticeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  breed: {
    type: String,
  },
  place: {
    type: String,
  },
  price: {
    type: String,
    default: 0,
  },
  name: {
    type: String,
    default: 'my pet',
    required: true,
  },
  birthday: {
    type: String,
    default: '00.00.0000',
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  comments: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    enum: ['sell', 'lost-found', 'for-free'],
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
});

const addNoticeValidation = (req, res, next) => {
  const { noticeId } = req.params;
  if (noticeId === 'sell') {
    const schema = Joi.object({
      title: Joi.string()
        .min(2)
        .max(48)
        .pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ,.! ]+$/)
        .message('title should be from 2 to 48 symbols')
        .required(),
      breed: Joi.string()
        .min(2)
        .max(24)
        .message('breed should be from 2 to 24 symbols')
        .required(),
      place: Joi.string().min(4).max(60).required(),
      price: Joi.string()
        .min(1)
        .pattern(/^[1-9][0-9]*$/)
        .message('price cannot starts from zero')
        .required(),
      age: Joi.string().message('price cannot starts from zero').required(),
      name: Joi.string()
        .min(2)
        .max(16)
        .message('name should be from 2 to 16 symbols')
        .required(),
      birthday: Joi.date()
        .max('now')
        .format(['DD.MM.YYYY'])
        .utc()
        .message('birthday should be in DD.MM.YYYY format'),
      sex: Joi.string().valid('female', 'male').required(),
      comments: Joi.string()
        .min(8)
        .max(120)
        .message('breed should be from 8 to 120 symbols'),
      imageUrl: Joi.string(),
      category: Joi.string().valid('sell', 'lost-found', 'for-free').required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  }
  if (noticeId === 'lost-found' || noticeId === 'for-free') {
    const schema = Joi.object({
      title: Joi.string()
        .min(2)
        .max(48)
        .pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ,.! ]+$/)
        .message('title should be from 2 to 48 symbols')
        .required(),
      breed: Joi.string()
        .min(2)
        .max(24)
        .message('breed should be from 2 to 24 symbols'),
      place: Joi.string().min(4).max(60).required(),
      price: Joi.string()
        .min(1)
        .pattern(/^[1-9][0-9]*$/)
        .message('price cannot starts from zero'),
      age: Joi.string().message('price cannot starts from zero'),
      name: Joi.string()
        .min(2)
        .max(16)
        .message('name should be from 2 to 16 symbols'),
      birthday: Joi.date()
        .max('now')
        .format(['DD.MM.YYYY'])
        .utc()
        .message('birthday should be in DD.MM.YYYY format'),
      sex: Joi.string().valid('female', 'male').required(),
      comments: Joi.string()
        .min(8)
        .max(120)
        .message('breed should be from 8 to 120 symbols'),
      imageUrl: Joi.string().required(),
      category: Joi.string().valid('sell', 'lost-found', 'for-free').required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
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
