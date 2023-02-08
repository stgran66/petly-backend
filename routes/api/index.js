const authRouter = require('./auth');
const newsRouter = require('./news');
const serviceRouter = require('./service');
const noticeRouter = require('./notice');
const healthzRouter = require('./healthz');
const userRouter = require('./user');

module.exports = {
  authRouter,
  newsRouter,
  serviceRouter,
  healthzRouter,
  noticeRouter,
  userRouter,
};
