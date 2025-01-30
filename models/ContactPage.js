const mongoose = require('mongoose')

const ContactDetailsSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('contactdetails', ContactDetailsSchema)