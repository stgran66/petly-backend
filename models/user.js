const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');
const ObjectId = require('mongoose').Types.ObjectId;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: [Schema.Types.ObjectId],
      ref: 'notice',
    },

    birthday: {
      type: String,
      default: '00.00.0000',
      required: [true, 'birthday is required'],
    },

    avatarURL: {
      type: String,
      required: true,
    },

    pets: {
      type: [Schema.Types.ObjectId],
      ref: 'pet',
    },

    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const signupSchema = Joi.object({
  email: Joi.string()
    .min(10)
    .max(63)
    .pattern(/^((?!-)[a-zA-Z0-9_.-]+){2}@[a-zA-Z0-9.-]+$/)
    .email({ minDomainSegments: 2 })
    .messages({
      'string.pattern.base': `email can contain only latin letters, numbers and symbols . -  _ (dot, hyphen, underscore) and can't start from hyphen`,
    })
    .required(),
  password: Joi.string()
    .min(7)
    .max(32)
    .pattern(/^[^ ]{7,32}$/)
    .messages({
      'string.pattern.base': `password should be from 7 to 32 characters long, without spaces`,
    })
    .required(),
  name: Joi.string()
    .pattern(/^[^ ][a-zA-zа-яіїєА-ЯІЇЄ ]+$/)
    .messages({
      'string.pattern.base': `name can contain only Latin and Cyrillic characters and can't start from spaces`,
    })
    .required(),
  city: Joi.string(),
  phone: Joi.string()
    .min(13)
    .max(13)
    .pattern(/^\+380\d{3}\d{2}\d{2}\d{2}$/)
    .messages({
      'string.pattern.base': `Phone number can contain only 13 symbols: starts from  '+380' and 9 digits after.`,
    }),
  birthday: Joi.string()
    .default('00.00.0000')
    .pattern(/^([0-2][0-9]|(3)[0-1])\.(((0)[0-9])|((1)[0-2]))\.\d{4}$/),
});

const loginSchema = Joi.object({
  password: Joi.string().min(7).max(32).required(),
  email: Joi.string()
    .min(10)
    .max(63)
    .pattern(/^((?!-)[a-zA-Z0-9_.-]+){2}@[a-zA-Z0-9.-]+$/)
    .email({ minDomainSegments: 2 })
    .messages({
      'string.pattern.base': `email can contain only latin letters, numbers and symbols . -  _ (dot, hyphen, underscore) and can't start from hyphen`,
    })
    .required(),
});

const idValidation = (req, res, next) => {
  if (ObjectId.isValid(req.params.noticeId)) {
    if (String(new ObjectId(req.params.noticeId)) === req.params.noticeId)
      return next();
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(404).json({ message: 'Not found' });
};

const User = model('user', userSchema);

const updateUserSchema = Joi.object({
  email: Joi.string()
    .min(10)
    .max(63)
    .pattern(/^((?!-)[a-zA-Z0-9_.-]+){2}@[a-zA-Z0-9.-]+$/)
    .email({ minDomainSegments: 2 })
    .messages({
      'string.pattern.base': `email can contain only latin letters, numbers and symbols . -  _ (dot, hyphen, underscore) and can't start from hyphen`,
    }),

  name: Joi.string()
    .pattern(/^[^ ][a-zA-zа-яіїєА-ЯІЇЄ ]+$/)
    .messages({
      'string.pattern.base': `name can contain only Latin and Cyrillic characters, minimim 2 symbpls and can't start from spaces`,
    }),
  city: Joi.string(),
  phone: Joi.string()
    .min(13)
    .max(13)
    .pattern(/^\+380\d{3}\d{2}\d{2}\d{2}$/)
    .messages({
      'string.pattern.base': `Phone number can contain only 13 symbols: starts from  '+380' and 9 digits after.`,
    }),
  birthday: Joi.string()
    .pattern(/^([0-2][0-9]|(3)[0-1])\.(((0)[0-9])|((1)[0-2]))\.\d{4}$/)
    .message('birthday should be in dd.mm.yyyy format'),
}).min(1);

const schemas = {
  signupSchema,
  loginSchema,
  idValidation,
  updateUserSchema,
};

module.exports = {
  User,
  schemas,
};
