const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));

const noticeSchema = new Schema(
  {
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
      default: '0',
    },
    name: {
      type: String,
      default: 'my pet',
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
    phone: {
      type: String,
      default: 'unknown',
    },
    email: {
      type: String,
      default: 'unknown',
    },
  },
  { timestamps: true }
);

const addNoticeValidation = (req, res, next) => {
  const { category } = req.body;
  if (category === 'sell') {
    const schema = Joi.object({
      title: Joi.string()
        .min(2)
        .max(48)
        .pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ]+[a-zA-zа-яіїєА-ЯІЇЄ,.! ]+$/)
        .message(
          'title should be from 2 to 48 symbols and not start from special symbol'
        )
        .required(),
      breed: Joi.string()
        .min(2)
        .max(16)
        .pattern(
          /^[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']*$/
        )
        .message(
          'breed should be from 2 to 16 symbols and contain only letters with optional dashes and spaces inside'
        )
        .required(),
      place: Joi.string()
        .min(4)
        .max(60)
        .pattern(
          /^[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']*$/
        )
        .required(),
      price: Joi.string()
        .min(1)
        .pattern(/^[1-9][0-9]* ?(\$|₴)?$/)
        .message(
          'price is number not starting from zero and after can be $ or ₴ symbol'
        )
        .required(),
      name: Joi.string()
        .min(2)
        .max(16)
        .message(
          'name should be from 2 to 16 symbols and contain only letters with optional dashes and spaces inside'
        )
        .pattern(
          /^[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']*$/
        )
        .required(),
      birthday: Joi.date()
        .default('00.00.0000')
        .min('01.01.1900')
        .max('now')
        .format(['DD.MM.YYYY'])
        .utc()
        .messages({
          'string.pattern.base': `birthday field cannot be newer than today and should be in DD.MM.YYYY format`,
        }),
      sex: Joi.string().valid('female', 'male').required(),
      comments: Joi.string()
        .min(8)
        .max(120)
        .message('breed should be from 8 to 120 symbols')
        .allow('', null),
      imageUrl: Joi.string(),
      category: Joi.string().valid('sell', 'lost-found', 'for-free').required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
  }
  if (category === 'lost-found' || category === 'for-free') {
    const schema = Joi.object({
      title: Joi.string()
        .min(2)
        .max(48)
        .pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ]+[a-zA-zа-яіїєА-ЯІЇЄ,.! ]+$/)
        .message(
          'title should be from 2 to 48 symbols and not start from special symbol'
        )
        .required(),
      breed: Joi.string()
        .min(2)
        .max(16)
        .message(
          'breed should be from 2 to 16 symbols and contain only letters with optional dashes and spaces inside'
        )
        .pattern(
          /^[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+$/
        )
        .allow(null, ''),
      place: Joi.string()
        .min(4)
        .max(60)
        .pattern(
          /^[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+$/
        )
        .required(),
      price: Joi.string().allow('', null),
      name: Joi.string()
        .min(2)
        .max(16)
        .message(
          'name should be from 2 to 16 symbols and contain only letters with optional dashes and spaces inside'
        )
        .pattern(
          /^[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+(-| )?[a-zA-zа-яіїєА-ЯІЇЄ']+$/
        )
        .allow(null, ''),
      birthday: Joi.date()
        .default('00.00.0000')
        .min('01.01.1900')
        .max('now')
        .format(['DD.MM.YYYY'])
        .utc()
        .messages({
          'string.pattern.base': `birthday field cannot be newer than today and should be in DD.MM.YYYY format`,
        })
        .allow(null, ''),
      sex: Joi.string().valid('female', 'male').required(),
      comments: Joi.string()
        .min(8)
        .max(120)
        .message('breed should be from 8 to 120 symbols')
        .allow(null, ''),
      imageUrl: Joi.string(),
      category: Joi.string().valid('sell', 'lost-found', 'for-free').required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
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
