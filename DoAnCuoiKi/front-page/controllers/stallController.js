var Stall = require('../models/stall');
var Product = require('../models/product');

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
    res.send('NOT IMPLEMENTED: Stall create GET');
};

// Handle Stall create on POST.
exports.stall_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Stall create POST');
};

// Display Stall delete form on GET.
exports.stall_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Stall delete GET');
};

// Handle Stall delete on POST.
exports.stall_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Stall delete POST');
};

// Display Stall update form on GET.
exports.stall_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Stall update GET');
};

// Handle Stall update on POST.
exports.stall_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Stall update POST');
};
