const express = require('express')
const router = express.Router()
const { 
    getHeroSection,
     updateHeroSection, 
     getCardSection, 
     updateCardsSection, 
     getAdvantageSection, 
     updateAdvantageSection,
     updateCustomMade,
     getCustom,
     updateStoreSection,
     getStore,
     getProductSection,
     updateProductSection
    } 
    = require('../controllers/homeSectionsController')
const upload = require('../middlewares/uploadMiddleware')

router.get('/herosection', getHeroSection)
router.put('/herosection', upload.fields([
    
        {name:'carousel1img', maxCount:1},
        {name:'carousel2img', maxCount:1},
        {name:'carousel3img', maxCount:1},
        {name:'carousel4img', maxCount:1}

    
]), updateHeroSection)
router.get('/cards', getCardSection)
router.put('/cards', upload.fields([
    {name:'card1img', maxCount:1},
    {name:'card2img', maxCount:1},
    {name:'card3img', maxCount:1},
    {name:'card4img', maxCount:1}
]), updateCardsSection)
router.get('/advantages', getAdvantageSection)
router.put('/advantages', upload.array('images', 8),updateAdvantageSection)
router.get('/custom', getCustom)
router.put('/custom', upload.single('image'),updateCustomMade)
router.get('/store', getStore)
router.put('/store', upload.single('image'),updateStoreSection)
router.get('/product-section', getProductSection)
router.put('/product-section', upload.array('images', 12),updateProductSection)


module.exports = router