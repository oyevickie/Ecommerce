const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchemaa = new Schema({
    description: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    descriptionn: {
        type: String,
        require: true
    },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('about', UserSchemaa)