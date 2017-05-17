var log = require('logger')('model-configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = require('validators').types;

var config = Schema({
    has: {type: Object, default: {}},
    allowed: {type: Object, default: {}},
    name: {
        type: String,
        required: true,
        validator: types.name({
            length: 100
        })
    },
    value: {
        type: String,
        validator: types.string({
            length: 1000
        })
    }
}, {collection: 'configs'});

config.set('toJSON', {
    getters: true,
    //virtuals: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    }
});

config.virtual('id').get(function () {
    return this._id;
});

module.exports = mongoose.model('configs', config);