var OrderDetail = require('../models/orderdetail');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

// Display list of all OrderDetail.
exports.orderdetail_list = function(req, res) {
  if (login_id == null || login_id.type != 'Customer') res.redirect('/api/account/login');
  OrderDetail.find({account: login_id._id,order: null})
    .populate('product')
    .exec(function (err, list_orderdetails) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('orderdetail_list', { title: 'OrderDetail List', list_orderdetails:  list_orderdetails});
    });
};

// Display detail page for a specific OrderDetail.
exports.orderdetail_detail = function(req, res) {

  async.parallel({
    orderdetail: function(callback) {

        OrderDetail.findById(req.params.id)
          .populate('product')
          .exec(callback);
    },
}, function(err, results) {
    if (err) { return next(err); }
    if (results.orderdetail==null) { // No results.
        var err = new Error('OrderDetail not found');
        err.status = 404;
        return next(err);
    }
    order_add=results;
    // Successful, so render.
    res.render('orderdetail_detail', { title: 'Title', orderdetail: results.orderdetail } );
});

};

// Display OrderDetail create form on GET.
exports.orderdetail_create_get = function(req, res, next) {
  if (login_id == null || login_id.type != 'Customer') res.redirect('/api/account/login');
    res.render('orderdetail_form', { title: 'Create orderdetail' });
};

// Handle OrderDetail create on POST.
exports.orderdetail_create_post = [
  // Validate fields.

      body('number').isNumeric({ min: 1 }).trim().withMessage('Giá trị quá nhỏ.'),

      // Sanitize fields.
      sanitizeBody('number').escape(),

      // Process request after validation and sanitization.
      (req, res, next) => {

          // Extract the validation errors from a request.
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              // There are errors. Render form again with sanitized values/errors messages.
              res.render('orderdetail_form', { title: 'Create order detail', orderdetail: req.body, errors: errors.array() });
              return;
          }
          else {
              // Data from form is valid.

              // Create an orderdetail object with escaped and trimmed data.
              var orderdetail = new OrderDetail(
                  {
                    product: product_add._id,
                    number: req.body.number,
                    account: login_id._id
                  });
              orderdetail.save(function (err) {
                  if (err) { return next(err); }
                  // Successful - redirect to new orderdetail record.
                  res.redirect(orderdetail.url);
              });
          }
      }
];

// Display OrderDetail delete form on GET.
exports.orderdetail_delete_get = function(req, res, next) {
if (login_id == null || login_id.type != 'Customer') res.redirect('/api/account/login');
  OrderDetail.findById(req.params.id)
    .exec(function (err, orderdetail) {
        if (err) { return next(err); }
        if (orderdetail==null) { // No results.
            res.redirect('/api/orderdetails');
        }
        // Successful, so render.
        res.render('orderdetail_delete', { title: 'Delete Order Detail', product:  orderdetail});
    })
};

// Handle OrderDetail delete on POST.
exports.orderdetail_delete_post = function(req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).

    // Assume valid ProductInstance id in field.
    OrderDetail.findByIdAndRemove(req.params.id, function deleteProductInstance(err) {
        if (err) { return next(err); }
            // Success, so redirect to list of ProductInstance items.
            res.redirect('/api/orderdetails');
        });

};
var temp;
// Display OrderDetail update form on GET.
exports.orderdetail_update_get = function (req, res, next) {
if (login_id == null || login_id.type != 'Customer') res.redirect('/api/account/login');
  async.parallel({
        orderdetail: function(callback) {
            OrderDetail.findById(req.params.id).populate('product').exec(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.orderdetail==null) { // No results.
                var err = new Error('orderdetail not found');
                err.status = 404;
                return next(err);
            }
            temp = results.orderdetail;
            res.render('orderdetail_form', { title: 'Update orderdetail', orderdetail: results.orderdetail });
        });

};

// Handle OrderDetail update on POST.
exports.orderdetail_update_post = [
  // Validate fields.

      body('number').isNumeric({ min: 1 }).trim().withMessage('Giá trị quá nhỏ.'),

      // Sanitize fields.
      sanitizeBody('number').escape(),

      // Process request after validation and sanitization.
      (req, res, next) => {

          // Extract the validation errors from a request.
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              // There are errors. Render form again with sanitized values/errors messages.
              res.render('orderdetail_form', { title: 'Create order detail', orderdetail: req.body, errors: errors.array() });
              return;
          }
          else {
              // Data from form is valid.

              // Create an orderdetail object with escaped and trimmed data.
              var orderdetail = new OrderDetail(
                  {
                    product: temp.product,
                    number: req.body.number,
                    account: login_id._id,
                    _id: req.params.id
                  });
              OrderDetail.findByIdAndUpdate(req.params.id, orderdetail, {}, function (err,theproduct) {
                    if (err) { return next(err); }
                       // Successful - redirect to product detail page.
                       res.redirect(theproduct.url);
                    });
          }
      }
];
