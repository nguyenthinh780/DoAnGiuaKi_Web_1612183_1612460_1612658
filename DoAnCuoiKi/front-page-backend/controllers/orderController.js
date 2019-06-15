var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

// Display list of all Order.
exports.order_list = function(req, res) {

  // Order.find()
  //   .exec(function (err, list_orders) {
  //     if (err) { return next(err); }
  //     // Successful, so render.
  //     res.render('order_list', { title: 'Order List', list_orders:  list_orders});
  //   });

};

// Display detail page for a specific Order.
exports.order_detail = function(req, res) {

  async.parallel({
     order: function(callback) {
         Order.findById(req.params.id)
          .populate('product')
           .exec(callback);
     },

     order_orderdetails: function(callback) {
         OrderDetail.find({ 'order': req.params.id })
         .populate('order')
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
  if (login_id == null || login_id.type != 'Customer') res.redirect('/api/account/login');
  res.render('order_form', { title: 'Create Order' });
};

// Handle Order create on POST.
exports.order_create_post = [(req, res, next) => {

          // Extract the validation errors from a request.
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              // There are errors. Render form again with sanitized values/errors messages.
              res.render('order_form', { title: 'Create Oder', order: req.body, errors: errors.array() });
              return;
          }
          else {
              //res.send(order_add);
              // Create an Order object with escaped and trimmed data.
              var order = new Order(
                  {
                    product: order_add.orderdetail.product,
                    number: order_add.orderdetail.number,
                    account: login_id
                  });
              order.save(function (err) {
                  if (err) { return next(err); }
                  // Successful - redirect to new order record.
                  res.redirect(order.url);
              });

          }
}
];

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
    res.send('NOT IMPLEMENTED: OrderDetail list');
};

// Handle Order update on POST.
exports.order_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: OrderDetail list');
};
