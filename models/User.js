const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})
module.exports = mongoose.model('user', UserSchema)