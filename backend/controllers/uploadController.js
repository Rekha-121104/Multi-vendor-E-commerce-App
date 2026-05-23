const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'image', folder: 'multi-vendor' },
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      res.status(201).json({ url: result.secure_url });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
});

module.exports = { uploadImage };
