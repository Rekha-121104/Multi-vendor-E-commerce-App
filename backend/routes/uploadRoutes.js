const express = require('express');
const multer = require('multer');
const { protect, authorizeRoles } = require('../middleware/auth');
const { uploadImage } = require('../controllers/uploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
router.post('/', protect, authorizeRoles('vendor', 'admin'), upload.single('file'), uploadImage);

module.exports = router;
