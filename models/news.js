const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

const News = model('news', newsSchema);

module.exports = {
  News,
};
