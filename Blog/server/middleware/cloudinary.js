const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Function to upload image to Cloudinary
async function uploadImageToCloudinary(imagePath) {
  console.log(imagePath);

  //uplaod image
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imagePath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);
        }
      });
    });
  } catch (error) {
    console.log("error uplaoding image", error);
  }
}

module.exports = uploadImageToCloudinary;
