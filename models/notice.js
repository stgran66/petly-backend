const { Schema, model } = require('mongoose');

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
    enum: ['sell', 'lostOrFound', 'in good hands'],
  },
});

const Notice = model('notice', noticeSchema);

module.exports = {
  Notice,
};
