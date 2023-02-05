const authRouter = require('./auth');
const newsRouter = require('./news');
const serviceRouter = require('./service');
const healthzRouter = require('./healthz');

module.exports = { authRouter, newsRouter, serviceRouter, healthzRouter };
