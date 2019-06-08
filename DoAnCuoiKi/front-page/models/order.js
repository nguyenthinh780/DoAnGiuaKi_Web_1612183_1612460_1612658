var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    order_date:{type: Date, required: true, default: Date.now},
    type: {type: String, required: true, enum: ['Chưa giao', 'Đang giao', 'Đã giao'], default: 'Chưa giao'}
  }
);

// Virtual for order's URL
OrderSchema
.virtual('url')
.get(function () {
  return '/api/order/' + this._id;
});

//Export model
module.exports = mongoose.model('Order', OrderSchema);
