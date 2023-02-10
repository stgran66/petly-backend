const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { nanoid } = require('nanoid');

const apiKey = process.env.CLOUDINARY_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
  cloud_name: 'dm3ikbt0t',
  api_key: apiKey,
  api_secret: apiSecret,
});

// Example of usage

const cloudinaryUpload = (name, path) => {
  const publicId = `${name}_photo_${nanoid()}`;
  const image = cloudinary.uploader.upload(path, { public_id: publicId });

  image
    .then(data => {
      // console.log(data);
      // console.log(data.secure_url);
    })
    .catch(err => {
      console.log(err);
    });
  const url = cloudinary.url(publicId, {
    width: 161,
    height: 161,
    crop: 'fill',
  });
  console.log(url);
  return url;
};

module.exports = cloudinaryUpload;
