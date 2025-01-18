const express = require('express');
const multer = require('multer');
const aboutSectionController = require('../controllers/aboutSectionController');

const router = express.Router();


const upload = multer({ dest: 'uploads/' });

router.get('/', aboutSectionController.getAboutSection);

router.put(
  '/',
  upload.fields([
    { name: 'mainBanner', maxCount: 1 },
    { name: 'firstSectionImage', maxCount: 1 },
    { name: 'secondSectionImage', maxCount: 1 },
    { name: 'thirdSectionImage', maxCount: 1 },
  ]),
  aboutSectionController.updateAboutSection
);

module.exports = router;
