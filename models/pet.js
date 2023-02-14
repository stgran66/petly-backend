const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));
const { handleMongooseError } = require('../helpers');

const petSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Pet name is required'],
    },
    birthday: {
      type: String,
      default: 'unknown',
      required: [true, 'birthday is required'],
    },
    breed: {
      type: String,
      default: 'other',
      required: [true, 'breed is required'],
    },
    photo: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const addPetSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(16)
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .message('name should be 2 to 16 characters long')
    .required(),
  breed: Joi.string()
    .min(2)
    .max(16)
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .message('breed should be 2 to 16 characters long')
    .required(),
  comments: Joi.string()
    .min(8)
    .max(120)
    .message('comment should be 8 to 120 characters long'),
  birthday: Joi.date()
    .default('00.00.0000')
    .min('01.01.1900')
    .max('now')
    .format(['DD.MM.YYYY'])
    .utc()
    .messages({
      'string.pattern.base': `birthday field cannot be newer than today and should be in DD.MM.YYYY format`,
    }),
});

petSchema.post('save', handleMongooseError);

const Pet = model('pet', petSchema);

module.exports = {
  Pet,
  addPetSchema,
};
