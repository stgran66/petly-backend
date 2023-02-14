const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// add const for swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const {
  authRouter,
  newsRouter,
  serviceRouter,
  noticeRouter,
  userRouter,
  healthzRouter,
} = require('./routes/api/');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// swagger page
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/services', serviceRouter);
app.use('/api/notices', noticeRouter);
app.use('/api/user', userRouter);
// health check
app.use('/api/healthz', healthzRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
