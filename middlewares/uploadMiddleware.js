const multer = require('multer');
const path = require('path');

// Set up storage configuration with enhanced unique filename generation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Create a unique filename using fieldname, current timestamp, and a random number
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    // Custom error for file type validation
    cb(new Error('Only .jpeg, .jpg, .png, .gif, and .webp images are allowed.'));
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20MB
  fileFilter
});

module.exports = upload;
