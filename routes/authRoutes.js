const express = require('express')
const { register, login, getProfile, updateProfile } = require('../controllers/authController')
const userAuth = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', userAuth, getProfile);  
router.put('/profile', userAuth, updateProfile);

module.exports = router