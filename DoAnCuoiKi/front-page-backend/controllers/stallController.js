var Stall = require('../models/stall');
var Product = require('../models/product');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

// Display list of all Stall.
exports.stall_list = function(req, res) {

  Stall.find({}, 'stall_name')
    .exec(function (err, list_stalls) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('stall_list', { title: 'Stall List', list_stalls:  list_stalls});
    });

};

// Display detail page for a specific Stall.
exports.stall_detail = function(req, res) {

  async.parallel({
      stall: function(callback) {

          Stall.findById(req.params.id)
            .exec(callback);
      },
      products: function(callback) {

        Product.find({ 'stall': req.params.id })
        .exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.stall==null) { // No results.
          var err = new Error('Stall not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render.
      res.render('stall_detail', { title: 'Title', stall: results.stall, products: results.products } );
  });

};

// Display Stall create form on GET.
exports.stall_create_get = function(req, res) {
    // res.render('stall_form', { title: 'Create Stall' });
};

// Handle Stall create on POST.
exports.stall_create_post =  [
  // Validate fields.
      body('stall_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên gian hàng.')
        //  .isAlphanumeric().withMessage('Tên gian hàng không thể chứa số')
          .isLength({ max: 50 }).trim().withMessage('Tên gian hàng quá dài.'),
      body('stall_description').isLength({ max: 250 }).trim().withMessage('Mô tả gian hàng quá dài.'),

      // Sanitize fields.
      sanitizeBody('stall_name').escape(),
      sanitizeBody('stall_description').escape(),

      // Process request after validation and sanitization.
      (req, res, next) => {

          // Extract the validation errors from a request.
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              // There are errors. Render form again with sanitized values/errors messages.
              res.render('stall_form', { title: 'Create Stall', stall: req.body, errors: errors.array() });
              return;
          }
          else {
              // Data from form is valid.

              // Create an Stall object with escaped and trimmed data.
              var stall = new Stall(
                  {
                      stall_name: req.body.stall_name,
                      stall_description: req.body.stall_description
                  });
              stall.save(function (err) {
                  if (err) { return next(err); }
                  // Successful - redirect to new stall record.
                  res.redirect(stall.url);
              });
          }
      }
];

// Display Stall delete form on GET.
exports.stall_delete_get = function (req, res, next) {

    async.parallel({
        stall: function (callback) {
            Stall.findById(req.params.id).exec(callback)
        },
        stalls_products: function (callback) {
            Product.find({ 'stall': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.stall == null) { // No results.
            res.redirect('/api/stalls');
        }
        // Successful, so render.
        res.render('stall_delete', { title: 'Delete Stall', stall: results.stall, stall_products: results.stalls_products });
    });
};

// Handle Stall delete on POST.
exports.stall_delete_post =  function (req, res, next) {

    async.parallel({
        stall: function (callback) {
            Stall.findById(req.body.stallid).exec(callback)
        },
        stalls_products: function (callback) {
            Product.find({ 'stall': req.body.stallid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.stalls_products.length > 0) {
            // Stall has products. Render in same way as for GET route.
            res.render('stall_delete', { title: 'Delete Stall', stall: results.stall, stall_products: results.stalls_products });
            return;
        }
        else {
            // Stall has no products. Delete object and redirect to the list of stalls.
            Stall.findByIdAndRemove(req.body.stallid, function deleteStall(err) {
                if (err) { return next(err); }
                // Success - go to stall list.
                res.redirect('/api/stalls')
            })

        }
    });

};

// Display Stall update form on GET.
exports.stall_update_get = function (req, res, next) {

    Stall.findById(req.params.id, function (err, stall) {
        if (err) { return next(err); }
        if (stall == null) { // No results.
            var err = new Error('Stall not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('stall_form', { title: 'Update Stall', stall: stall });

    });
};

// Handle Stall update on POST.
exports.stall_update_post = [

  body('stall_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên gian hàng.')
    //  .isAlphanumeric().withMessage('Tên gian hàng không thể chứa số')
      .isLength({ max: 50 }).trim().withMessage('Tên gian hàng quá dài.'),
  body('stall_description').isLength({ max: 250 }).trim().withMessage('Mô tả gian hàng quá dài.'),

  // Sanitize fields.
  sanitizeBody('stall_name').escape(),
  sanitizeBody('stall_description').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        // const errors = validationResult(req);
        //
        // // Create Stall object with escaped and trimmed data (and the old id!)
        // var stall = new Stall(
        //     {
        //       stall_name: req.body.stall_name,
        //       stall_description: req.body.stall_description,
        //         _id: req.params.id
        //     }
        // );
        //
        // if (!errors.isEmpty()) {
        //     // There are errors. Render the form again with sanitized values and error messages.
        //     res.render('stall_form', { title: 'Update Stall', stall: stall, errors: errors.array() });
        //     return;
        // }
        // else {
        //     // Data from form is valid. Update the record.
        //     Stall.findByIdAndUpdate(req.params.id, stall, {}, function (err, thestall) {
        //         if (err) { return next(err); }
        //         // Successful - redirect to genre detail page.
        //         res.redirect(thestall.url);
        //     });
        // }
    }
];
