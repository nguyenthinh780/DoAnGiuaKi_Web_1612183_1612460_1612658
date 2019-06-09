var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');

var async = require('async');

// Display list of all Order.
exports.order_list = function(req, res) {

  Order.find()
    .exec(function (err, list_orders) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('order_list', { title: 'Order List', list_orders:  list_orders});
    });

};

// Display detail page for a specific Order.
exports.order_detail = function(req, res) {

  async.parallel({
     order: function(callback) {
         Order.findById(req.params.id)
           .exec(callback);
     },

     order_orderdetails: function(callback) {
         OrderDetail.find({ 'order': req.params.id })
         .populate('product')
           .exec(callback);
     },

 }, function(err, results) {
     if (err) { return next(err); }
     if (results.order==null) { // No results.
         var err = new Error('Order not found');
         err.status = 404;
         return next(err);
     }
     // Successful, so render
     res.render('order_detail', { title: 'Order Detail', order: results.order, order_orderdetails: results.order_orderdetails } );
 });

};

// Display Order create form on GET.
exports.order_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Order create GET');
};

// Handle Order create on POST.
exports.order_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Order create POST');
};

// Display Order delete form on GET.
exports.order_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Order delete GET');
};

// Handle Order delete on POST.
exports.order_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Order delete POST');
};

// Display Order update form on GET.
exports.order_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Order update GET');
};

// Handle Order update on POST.
exports.order_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Order update POST');
};
