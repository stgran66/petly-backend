const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const petSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Pet name is required'],
      unique: true,
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
    .message('name should be 2 to 16 characters long')
    .required(),
  breed: Joi.string()
    .min(2)
    .max(16)
    .message('breed should be 2 to 16 characters long')
    .required(),
  comments: Joi.string()
    .min(8)
    .max(120)
    .message('comment should be 8 to 120 characters long'),
  birthday: Joi.string()
    .pattern(/^([0-2][0-9]|(3)[0-1])\.(((0)[0-9])|((1)[0-2]))\.\d{4}$/)
    .message('birthday should be in dd.mm.yyyy format'),
});

petSchema.post('save', handleMongooseError);

const Pet = model('pet', petSchema);

module.exports = {
  Pet,
  addPetSchema,
};
