const mongoose = require('mongoose')

const CustomMadeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('custommade',CustomMadeSchema)