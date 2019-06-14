var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StallSchema = new Schema(
  {
    stall_name: {type: String, required: true, max: 50},
    stall_description: {type: String, max: 250}
  }
);

// Virtual for stall's URL
StallSchema
.virtual('url')
.get(function () {
  return '/api/stall/' + this._id;
});

//Export model
module.exports = mongoose.model('Stall', StallSchema);
