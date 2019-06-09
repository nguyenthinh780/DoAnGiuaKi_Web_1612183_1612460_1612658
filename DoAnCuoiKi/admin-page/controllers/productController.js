var Product = require('../models/product');
var Stall = require('../models/stall');

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
          var err = new Error('Book not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render.
      res.render('product_detail', { title: 'Title', product: results.product } );
  });

};

// Display Product create form on GET.
exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product create GET');
};

// Handle Product create on POST.
exports.product_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product create POST');
};

// Display Product delete form on GET.
exports.product_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete GET');
};

// Handle Product delete on POST.
exports.product_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete POST');
};

// Display Product update form on GET.
exports.product_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update GET');
};

// Handle Product update on POST.
exports.product_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update POST');
};
