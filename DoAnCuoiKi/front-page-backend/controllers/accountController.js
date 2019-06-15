var Account = require('../models/account');
var Stall = require('../models/stall');
var Product = require('../models/product');
var Order = require('../models/order');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

exports.index = function(req, res) {

    Product.find({}, 'product_name stall image')
      .populate('stall')
      .exec(function (err, list_products) {
        if (err) { return next(err); }
        // Successful, so render.
        res.render('product_list', { title: 'Product List', list_products:  list_products});
      });

};

// Display list of all accounts.
exports.account_list = function(req, res) {
  //
  // Account.find({}, 'login_name type')
  //   .exec(function (err, list_accounts) {
  //     if (err) { return next(err); }
  //     // Successful, so render.
  //     res.render('account_list', { title: 'Account List', list_accounts:  list_accounts});
  //   });

};

exports.account_login_get = function(req, res, next) {
    if (login_id != null) res.redirect('/api/account/logout');
    res.render('account_login', { title: 'Login'});
};

// Handle account create on POST.
exports.account_login_post = [

    // Validate fields.
    body('login_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên đăng nhập.'),
    body('password').isLength({ min: 1 }).trim().withMessage('Hãy nhập mật khẩu.'),

    // Sanitize fields.
    sanitizeBody('login_name').escape(),
    sanitizeBody('password').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        var login_name = req.body.login_name;
        var password = req.body.password;
        //

        Account.findOne({login_name: login_name, password: password}, function (err,user) {
          if (err) { return next(err); }

          login_id = user;
          //res.send(global.login_id);
          res.redirect('/');
        })

    }
];


exports.account_logout_get = function(req, res, next) {
    if (login_id == null) res.redirect('/api/account/login');
    else res.render('account_logout', { title: 'Logout'});
};

// Handle account create on POST.
exports.account_logout_post = function (req, res, next) {
    login_id = null;
    res.redirect('/');
};

// Display detail page for a specific account.
exports.account_detail = function(req, res) {
    if (login_id == null) res.redirect('/api/account/login');
      async.parallel({
          account: function(callback) {

              Account.findById(login_id._id)
                .exec(callback);
          },
          orders: function(callback) {

            Order.find({ 'account': login_id._id })
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
exports.account_create_get = function(req, res, next) {
    res.render('account_form', { title: 'Create Account'});
};

// Handle account create on POST.
exports.account_create_post = [

    // Validate fields.
    body('login_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên đăng nhập.')
        .isLength({ max: 20 }).trim().withMessage('Tên đăng nhập quá dài.'),
    body('password').isLength({ min: 1 }).trim().withMessage('Hãy nhập mật khẩu.')
        .isLength({ max: 20 }).trim().withMessage('Mật khẩu quá dài.'),
    body('name').isLength({ max: 50 }).trim().withMessage('Tên quá dài.'),
    body('birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('email').isLength({ max: 50 }).trim().withMessage('Email quá dài.'),
    body('phone').isLength({ max: 15 }).trim().withMessage('Số điện thoại quá dài.'),
    body('type').isLength({ min: 1 }).trim().withMessage('Hãy chọn loại tài khoản.'),

    // Sanitize fields.
    sanitizeBody('login_name').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('birth').toDate(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('type').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create an Account object with escaped and trimmed data.
        var account = new Account(
            {
                login_name: req.body.login_name,
                password: req.body.password,
                name: req.body.name,
                birth: req.body.birth,
                email: req.body.email,
                phone: req.body.phone,
                type: req.body.type
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('account_form', { title: 'Create Account', account: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            account.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new account record.
                res.redirect(account.url);
            });
        }
    }
];

// Display account delete form on GET.
exports.account_delete_get = function (req, res, next) {

    async.parallel({
        account: function (callback) {
            Account.findById(req.params.id).exec(callback)
        },
        accounts_orders: function (callback) {
            Order.find({ 'account': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.account == null) { // No results.
            res.redirect('/catalog/accounts');
        }
        
        // Successful, so render.
        res.render('account_delete', { title: 'Delete Account', account: results.account, account_orders: results.accounts_orders });
    });

};

// Handle account delete on POST.
exports.account_delete_post = function (req, res, next) {
    //
    // async.parallel({
    //     account: function (callback) {
    //         Account.findById(req.body.accountid).exec(callback)
    //     },
    //     accounts_orders: function (callback) {
    //         Order.find({ 'account': req.body.accountid }).exec(callback)
    //     },
    // }, function (err, results) {
    //     if (err) { return next(err); }
    //     // Success.
    //     if (results.accounts_orders.length > 0) {
    //         // Account has orders. Render in same way as for GET route.
    //         res.render('account_delete', { title: 'Delete Account', account: results.account, account_orders: results.accounts_orders });
    //         return;
    //     }
    //     else {
    //         // Account has no orders. Delete object and redirect to the list of accounts.
    //         Account.findByIdAndRemove(req.body.accountid, function deleteAccount(err) {
    //             if (err) { return next(err); }
    //             // Success - go to account list.
    //             res.redirect('/api/accounts')
    //         })
    //
    //     }
    // });

};

// Display account update form on GET.
exports.account_update_get = function (req, res, next) {

    Account.findById(req.params.id, function (err, account) {
        if (err) { return next(err); }
        if (account == null) { // No results.
            var err = new Error('Account not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('account_form', { title: 'Update Account', account: account });

    });
};

// Handle account update on POST.
exports.account_update_post =  [

    // Validate fields.
    body('login_name').isLength({ min: 1 }).trim().withMessage('Hãy nhập tên đăng nhập.')
        .isLength({ max: 20 }).trim().withMessage('Tên đăng nhập quá dài.'),
    body('password').isLength({ min: 1 }).trim().withMessage('Hãy nhập mật khẩu.')
        .isLength({ max: 20 }).trim().withMessage('Mật khẩu quá dài.'),
    body('name').isLength({ max: 50 }).trim().withMessage('Tên quá dài.'),
    body('birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('email').isLength({ max: 50 }).trim().withMessage('Email quá dài.'),
    body('phone').isLength({ max: 15 }).trim().withMessage('Số điện thoại quá dài.'),
    body('type').isLength({ min: 1 }).trim().withMessage('Hãy chọn loại tài khoản.'),

    // Sanitize fields.
    sanitizeBody('login_name').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('birth').toDate(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('type').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Account object with escaped and trimmed data (and the old id!)
        var account = new Account(
            {
                login_name: req.body.login_name,
                password: req.body.password,
                name: req.body.name,
                birth: req.body.birth,
                email: req.body.email,
                phone: req.body.phone,
                type: req.body.type,
                _id: req.params.id
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('account_form', { title: 'Update Account', account: account, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Account.findByIdAndUpdate(req.params.id, account, {}, function (err, theaccount) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theaccount.url);
            });
        }
    }
];
