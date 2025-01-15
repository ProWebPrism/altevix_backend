const mongoose = require('mongoose')

const StoreSectionSchema = mongoose.Schema({
    subheading: {
       type: String,
       required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('storesection', StoreSectionSchema)