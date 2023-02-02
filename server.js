const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDB = process.env.DB_HOST;

mongoose.set('strictQuery', true);

const connection = mongoose.connect(uriDB);

connection
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.log(`Cannot connect to database. Error message: ${err.message}`);
    process.exit(1);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
