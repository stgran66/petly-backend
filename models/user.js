const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

/* eslint-disable */
// const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
// const passwordRegexp = /^ (? !$)([a - z][0 - 9][A - Z])$/;
/* eslint-enable */

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      // match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
      //   match: passwordRegexp,
      minlenght: 7,
      // maxlength: 32,
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
      minlenght: 12,
      maxlength: 12,
    },
    favorite: {
      type: Schema.Types.ObjectId,
    },

    // avatarURL: {
    //   type: String,
    //   required: true,
    // },
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
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  city: Joi.string(),
  phone: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().required(),
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
