var log = require('logger')('model-configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongutils = require('mongutils');
var mongins = require('mongins');
var types = require('validators').types;

var config = Schema({
    name: {
        type: String,
        required: true,
        searchable: true,
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

config.plugin(mongins({
  transform: function (o) {
      o.value = JSON.parse(o.value);
  }
}));
config.plugin(mongins.user);
config.plugin(mongins.createdAt());
config.plugin(mongins.updatedAt());

mongutils.ensureIndexes(config, [
  {name: 1, createdAt: 1, _id: 1}
]);

module.exports = mongoose.model('configs', config);