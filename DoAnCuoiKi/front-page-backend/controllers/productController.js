var Product = require('../models/product');
var Stall = require('../models/stall');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

// Display list of all Product.
exports.product_list = function(req, res) {

  Product.find({}, 'product_name stall')
    .populate('stall')
    .exec(function (err, list_products) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('product_list', { title: 'Product List', list_products:  list_products});
    });

};

// Display detail page for a specific Product.
exports.product_detail = function(req, res) {

  async.parallel({
      product: function(callback) {

          Product.findById(req.params.id)
            .populate('stall')
            .exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.product==null) { // No results.
          var err = new Error('Product not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render.
      product_add=results.product;
      res.render('product_detail', { title: 'Title', product: results.product } );
  });

};

// Display Product create form on GET.
exports.product_create_get = function(req, res, next) {
  async.parallel({
        stalls: function(callback) {
            Stall.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('product_form', { title: 'Create Product', stalls: results.stalls });
    });
};

// Handle Product create on POST.
exports.product_create_post = [

    // Validate fields.
    body('product_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên sản phẩm.')
        .isLength({ max: 50 }).trim().withMessage('Tên sản phẩm quá dài.'),
    body('product_description').isLength({ max: 250 }).trim().withMessage('Mô tả quá dài.'),
    body('brand').isLength({ max: 50 }).trim().withMessage('Tên hãng quá dài.'),
    body('price').isNumeric({ min: 1000 }).trim().withMessage('Giá trị quá nhỏ.'),


    sanitizeBody('product_name').escape(),
    sanitizeBody('product_description').escape(),
    sanitizeBody('brand').escape(),
    sanitizeBody('price').escape(),
    sanitizeBody('image').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create an Product object with escaped and trimmed data.
        var product = new Product(
            {
                product_name: req.body.product_name,
                stall: req.body.stall,
                brand: req.body.brand,
                product_description: req.body.product_description,
                price: req.body.price,
                image: req.body.image
            });

            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/error messages.

                // Get all products and genres for form.
                async.parallel({
                    stalls: function(callback) {
                        Stall.find(callback);
                    },
                }, function(err, results) {
                    if (err) { return next(err); }

                    res.render('product_form', { title: 'Create Product', stalls:results.stalls, product: product, errors: errors.array() });
                });
                return;
            }
            else {
                // Data from form is valid. Save product.
                product.save(function (err) {
                    if (err) { return next(err); }
                       //successful - redirect to new product record.
                       res.redirect(product.url);
                    });
            }
    }
];

// Display Product delete form on GET.
exports.product_delete_get = function(req, res, next) {

  Product.findById(req.params.id)
    .populate('Stall')
    .exec(function (err, product) {
        if (err) { return next(err); }
        if (product==null) { // No results.
            res.redirect('/api/products');
        }
        // Successful, so render.
        res.render('product_delete', { title: 'Delete Product', product:  product});
    })
};

// Handle Product delete on POST.
exports.product_delete_post =  function(req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).

    // Assume valid ProductInstance id in field.
    Product.findByIdAndRemove(req.body.id, function deleteProductInstance(err) {
        if (err) { return next(err); }
            // Success, so redirect to list of ProductInstance items.
            res.redirect('/api/products');
        });

};

// Display Product update form on GET.
exports.product_update_get = function (req, res, next) {

  async.parallel({
        product: function(callback) {
            Product.findById(req.params.id).populate('stall').populate('genre').exec(callback);
        },
        stalls: function(callback) {
            Stall.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.product==null) { // No results.
                var err = new Error('Product not found');
                err.status = 404;
                return next(err);
            }
            res.render('product_form', { title: 'Update Product', stalls:results.stalls, product: results.product });
        });

};

// Handle Product update on POST.
exports.product_update_post = [

      // Validate fields.
      body('product_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên sản phẩm.')
          .isLength({ max: 50 }).trim().withMessage('Tên sản phẩm quá dài.'),
      body('product_description').isLength({ max: 250 }).trim().withMessage('Mô tả quá dài.'),
      body('brand').isLength({ max: 50 }).trim().withMessage('Tên hãng quá dài.'),
      body('price').isNumeric({ min: 1000 }).trim().withMessage('Giá trị quá nhỏ.'),


      sanitizeBody('product_name').escape(),
      sanitizeBody('product_description').escape(),
      sanitizeBody('brand').escape(),
      sanitizeBody('price').escape(),
      sanitizeBody('image').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Product object with escaped and trimmed data (and the old id!)
        var product = new Product(
            {
              product_name: req.body.product_name,
              stall: req.body.stall,
              brand: req.body.brand,
              product_description: req.body.product_description,
              price: req.body.price,
              image: req.body.image,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all stalls and genres for form
            async.parallel({
                stalls: function(callback) {
                    Stall.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('product_form', { title: 'Update Product',stalls:results.stalls, product: product, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Product.findByIdAndUpdate(req.params.id, product, {}, function (err,theproduct) {
                if (err) { return next(err); }
                   // Successful - redirect to product detail page.
                   res.redirect(theproduct.url);
                });
        }
    }
];
