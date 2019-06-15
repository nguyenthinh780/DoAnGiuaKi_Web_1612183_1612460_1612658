var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderDetailSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order'},
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    number: {type: Number, required: true, max: 5000},
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true}
  }
);

// Virtual for orderdetail's URL
OrderDetailSchema
.virtual('url')
.get(function () {
  return '/api/orderdetail/' + this._id;
});

//Export model
module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
