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

  return image
    .then(data => {
      const url = cloudinary.url(publicId, {
        width: 233,
        height: 233,
        crop: 'fill',
      });
      return url;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = cloudinaryUpload;
