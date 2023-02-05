const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// add const for swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { authRouter, newsRouter, serviceRouter } = require('./routes/api/');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// swagger page
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use('/api/', Router);
// auth page
app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/services', serviceRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
