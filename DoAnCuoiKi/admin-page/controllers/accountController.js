var Account = require('../models/account');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all accounts.
exports.account_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Account list');
};

// Display detail page for a specific account.
exports.account_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Account detail: ' + req.params.id);
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
