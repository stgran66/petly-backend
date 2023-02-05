const { Service } = require('../../models/service');

const listServices = async (req, res, next) => {
  res.json(await Service.find({}));
};

module.exports = listServices;
