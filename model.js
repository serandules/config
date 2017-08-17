var log = require('logger')('model-configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongins = require('mongins');
var types = require('validators').types;

var config = Schema({
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

config.plugin(mongins);
config.plugin(mongins.user);
config.plugin(mongins.createdAt);
config.plugin(mongins.updatedAt);

config.set('toJSON', {
    getters: true,
    //virtuals: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

config.virtual('id').get(function () {
    return this._id;
});

module.exports = mongoose.model('configs', config);