var mongoose = require('mongoose');

var model;

try {
    model = mongoose.model('Configs') || require('./model');
} catch (e) {
    model = require('./model');
}

module.exports = model;