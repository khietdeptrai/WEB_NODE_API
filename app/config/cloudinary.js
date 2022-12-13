const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dwiossacc',
  api_key:'654513195591762',
  api_secret: 'csPC019AU_f2O31eIktU9ihIU6o',
});

module.exports = cloudinary;