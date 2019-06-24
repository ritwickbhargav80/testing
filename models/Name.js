const mongoose = require('mongoose');

const nameSchema = mongoose.Schema({
    firstname: String
});

module.exports = Name = mongoose.model('name', nameSchema);