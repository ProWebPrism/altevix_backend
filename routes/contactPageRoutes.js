const express = require('express')
const { getContactDetails, updateContactDetails } = require('../controllers/contactPageController')

const router = express.Router()

router.get('/', getContactDetails)
router.post('/', updateContactDetails)

module.exports = router