var Order = require('../models/order');

// Display list of all Order.
exports.order_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Order list');
};

// Display detail page for a specific Order.
exports.order_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Order detail: ' + req.params.id);
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
exports.order_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Order update GET');
};

// Handle Order update on POST.
exports.order_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Order update POST');
};
