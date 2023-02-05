const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const apiKey = process.env.CLOUDINARY_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
  cloud_name: 'dm3ikbt0t',
  api_key: apiKey,
  api_secret: apiSecret,
});

// Example of usage

// const res = cloudinary.uploader.upload(
//   'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
//   { public_id: 'olympic_flag' }
// );

// res
//   .then(data => {
//     console.log(data);
//     console.log(data.secure_url);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Generate
// const url = cloudinary.url('olympic_flag', {
//   width: 100,
//   height: 150,
//   Crop: 'fill',
// });

// The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_f

module.exports = cloudinary;
