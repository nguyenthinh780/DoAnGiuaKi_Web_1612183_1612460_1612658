var Account = require('../models/account');
var Stall = require('../models/stall');
var Product = require('../models/product');
var Order = require('../models/order');

var async = require('async');

exports.index = function(req, res) {
  async.parallel({
    account_count: function(callback) {
        Account.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    },
    stall_count: function(callback) {
          Stall.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    },
    product_count: function(callback) {
          Product.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    },
    order_count: function(callback) {
          Order.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    }
}, function(err, results) {
    res.render('index', { title: 'Home', error: err, data: results });
});

};

// Display list of all accounts.
exports.account_list = function(req, res) {

  Account.find({}, 'login_name type')
    .exec(function (err, list_accounts) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('account_list', { title: 'Account List', list_accounts:  list_accounts});
    });

};

// Display detail page for a specific account.
exports.account_detail = function(req, res) {

      async.parallel({
          account: function(callback) {

              Account.findById(req.params.id)
                .exec(callback);
          },
          orders: function(callback) {

            Order.find({ 'account': req.params.id })
            .exec(callback);
          },
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.account==null) { // No results.
              var err = new Error('Account not found');
              err.status = 404;
              return next(err);
          }
          // Successful, so render.
          res.render('account_detail', { title: 'Title', account: results.account, orders: results.orders } );
      });

};

// Display account create form on GET.
exports.account_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Account create GET');
};

// Handle account create on POST.
exports.account_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Account create POST');
};

// Display account delete form on GET.
exports.account_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Account delete GET');
};

// Handle account delete on POST.
exports.account_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Account delete POST');
};

// Display account update form on GET.
exports.account_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Account update GET');
};

// Handle account update on POST.
exports.account_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Account update POST');
};
