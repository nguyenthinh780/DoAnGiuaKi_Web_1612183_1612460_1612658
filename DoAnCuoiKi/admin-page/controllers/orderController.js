var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

// Display list of all Order.
exports.order_list = function(req, res) {
  if (login_id == null || login_id.type != 'Admin') res.redirect('/api/account/login');
  Order.find()
    .exec(function (err, list_orders) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('order_list', { title: 'Order List', list_orders:  list_orders});
    });

};

// Display detail page for a specific Order.
exports.order_detail = function(req, res) {
  if (login_id == null || login_id.type != 'Admin') res.redirect('/api/account/login');
  async.parallel({
     order: function(callback) {
         Order.findById(req.params.id)
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
exports.order_update_get = function (req, res, next) {
    if (login_id == null || login_id.type != 'Admin') res.redirect('/api/account/login');
      Order.findById(req.params.id, function (err, order) {
          if (err) { return next(err); }
          if (order == null) { // No results.
              var err = new Error('Order not found');
              err.status = 404;
              return next(err);
          }
          // Success.
          res.render('order_form', { title: 'Update Order', order: order });

      });
};

// Handle Order update on POST.
exports.order_update_post = [

    // Validate fields.
    body('type').isLength({ min: 1 }).trim().withMessage('Hãy chọn trạng thái.'),

    // Sanitize fields.
    sanitizeBody('type').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

          var order = new Order(
              {
                account: req.body.account,
                order_date:req.body.order_date,
                type: req.body.type,
                  _id: req.params.id
              }
          );

        if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values and error messages.
        res.render('order_form', { title: 'Update Order', order: order, errors: errors.array() });
        return;
    }
    else {
        // Data from form is valid. Update the record.
        Order.findByIdAndUpdate(req.params.id, order, {}, function (err, theorder) {
            if (err) { return next(err); }
            // Successful - redirect to genre detail page.
            res.redirect(theorder.url);
        });
    }
}
];
