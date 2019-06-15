var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    order_date:{type: Date, required: true, default: Date.now},
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    number: {type: Number, required: true, max: 5000},
    type: {type: String, required: true, enum: ['Chưa giao', 'Đang giao', 'Đã giao'], default: 'Chưa giao'},
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true}
  }
);

// Virtual for order's URL
OrderSchema
.virtual('url')
.get(function () {
  return '/api/order/' + this._id;
});

OrderSchema
.virtual('order_date_formatted')
.get(function () {
  return moment(this.order_date).format('MMMM Do, YYYY');
});

//Export model
module.exports = mongoose.model('Order', OrderSchema);
