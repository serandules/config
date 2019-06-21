var log = require('logger')('model-configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongins = require('mongins');
var validators = require('validators');
var model = require('model');

var types = validators.types;

var schema = Schema({
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

schema.plugin(mongins({
  transform: function (o) {
    o.value = JSON.parse(o.value);
  }
}));
schema.plugin(mongins.user);
schema.plugin(mongins.permissions({
  workflow: 'model'
}));
schema.plugin(mongins.status({
  workflow: 'model'
}));
schema.plugin(mongins.visibility({
  workflow: 'model'
}));
schema.plugin(mongins.createdAt());
schema.plugin(mongins.updatedAt());

model.ensureIndexes(schema, [
  {name: 1, createdAt: 1, _id: 1}
]);

module.exports = mongoose.model('configs', schema);
