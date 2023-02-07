const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

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
      type: Schema.Types.ObjectId,
    },

    avatarURL: {
      type: String,
      required: true,
    },

    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const signupSchema = Joi.object({
  email: Joi.string()
    .min(10)
    .max(63)
    .pattern(/^(?!-)[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/)

    .email({ minDomainSegments: 2 })
    .messages({
      'string.pattern.base': `email can contain only latin letters, numbers and symbols . -  _ (dot, hyphen, underscore) and can't start from hyphen`,
    })
    .required(),
  password: Joi.string().min(7).max(32).required(),
  name: Joi.string().required(),
  city: Joi.string(),
  phone: Joi.string()
    .min(13)
    .max(13)
    .pattern(/^\+380\d{3}\d{2}\d{2}\d{2}$/)
    .messages({
      'string.pattern.base': `Phone number can contain only 13 symbols: starts from symbol '+' and 12 digits after.`,
    }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(7).max(32).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const schemas = {
  signupSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
