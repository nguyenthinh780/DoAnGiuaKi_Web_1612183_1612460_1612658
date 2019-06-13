var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    product_name: {type: String, required: true, max: 50},
    stall: { type: Schema.Types.ObjectId, ref: 'Stall', required: true},
    brand:  {type: String, max: 50},
    product_description:  {type: String, max: 250},
    price: {type: Number, required: true, min:1000}
  }
);

// Virtual for product's URL
ProductSchema
.virtual('url')
.get(function () {
  return '/api/product/' + this._id;
});

//Export model
module.exports = mongoose.model('Product', ProductSchema);
