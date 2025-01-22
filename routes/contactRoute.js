const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/contactController');

// POST route to handle contact form submissions
router.post('/', sendEmail);

module.exports = router;