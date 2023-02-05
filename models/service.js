const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },

  address: {
    type: String,
  },
  workDays: {
    type: Array,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Service = model('service', serviceSchema);

module.exports = {
  Service,
};
