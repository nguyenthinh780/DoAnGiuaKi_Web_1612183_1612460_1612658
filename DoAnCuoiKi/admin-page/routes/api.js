var express = require('express');
var router = express.Router();

// Require controller modules.
var account_controller = require('../controllers/accountController');
var stall_controller = require('../controllers/stallController');
var product_controller = require('../controllers/productController');
var order_controller = require('../controllers/orderController');
var orderdetail_controller = require('../controllers/orderdetailController');

/// ACCOUNT ROUTES ///
// GET api home page.
router.get('/', account_controller.index);

// GET request for creating a Account. NOTE This must come before routes that display Account (uses id).
router.get('/account/login', account_controller.account_login_get);

// POST request for creating Account.
router.post('/account/login', account_controller.account_login_post);

// GET request for creating a Account. NOTE This must come before routes that display Account (uses id).
router.get('/account/logout', account_controller.account_logout_get);

// POST request for creating Account.
router.post('/account/logout', account_controller.account_logout_post);

// GET request for creating a Account. NOTE This must come before routes that display Account (uses id).
router.get('/account/create', account_controller.account_create_get);

// POST request for creating Account.
router.post('/account/create', account_controller.account_create_post);

// GET request to delete Account.
router.get('/account/:id/delete', account_controller.account_delete_get);

// POST request to delete Account.
router.post('/account/:id/delete', account_controller.account_delete_post);

// GET request to update Account.
router.get('/account/:id/update', account_controller.account_update_get);

// POST request to update Account.
router.post('/account/:id/update', account_controller.account_update_post);

// GET request for one Account.
router.get('/account/:id', account_controller.account_detail);

// GET request for list of all Account items.
router.get('/accounts', account_controller.account_list);

/// STALL ROUTES ///

// GET request for creating a Stall. NOTE This must come before route that displays Stall (uses id).
router.get('/stall/create', stall_controller.stall_create_get);

//POST request for creating Stall.
router.post('/stall/create', stall_controller.stall_create_post);

// GET request to delete Stall.
router.get('/stall/:id/delete', stall_controller.stall_delete_get);

// POST request to delete Stall.
router.post('/stall/:id/delete', stall_controller.stall_delete_post);

// GET request to update Stall.
router.get('/stall/:id/update', stall_controller.stall_update_get);

// POST request to update Stall.
router.post('/stall/:id/update', stall_controller.stall_update_post);

// GET request for one Stall.
router.get('/stall/:id', stall_controller.stall_detail);

// GET request for list of all Stall.
router.get('/stalls', stall_controller.stall_list);

/// PRODUCT ROUTES ///

// GET request for creating a Product. NOTE This must come before route that displays Product (uses id).
router.get('/product/create', product_controller.product_create_get);

//POST request for creating Product.
router.post('/product/create', product_controller.product_create_post);

// GET request to delete Product.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete Product.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request to update Product.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update Product.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one Product.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all Product.
router.get('/products', product_controller.product_list);

/// ORDER ROUTES ///

// GET request for creating a Order. NOTE This must come before route that displays Order (uses id).
router.get('/order/create', order_controller.order_create_get);

//POST request for creating Order.
router.post('/order/create', order_controller.order_create_post);

// GET request to delete Order.
router.get('/order/:id/delete', order_controller.order_delete_get);

// POST request to delete Order.
router.post('/order/:id/delete', order_controller.order_delete_post);

// GET request to update Order.
router.get('/order/:id/update', order_controller.order_update_get);

// POST request to update Order.
router.post('/order/:id/update', order_controller.order_update_post);

// GET request for one Order.
router.get('/order/:id', order_controller.order_detail);

// GET request for list of all Order.
router.get('/orders', order_controller.order_list);

/// ORDERDETAIL ROUTES ///

// GET request for creating a OrderDetail. NOTE This must come before route that displays OrderDetail (uses id).
router.get('/orderdetail/create', orderdetail_controller.orderdetail_create_get);

//POST request for creating OrderDetail.
router.post('/orderdetail/create', orderdetail_controller.orderdetail_create_post);

// GET request to delete OrderDetail.
router.get('/orderdetail/:id/delete', orderdetail_controller.orderdetail_delete_get);

// POST request to delete OrderDetail.
router.post('/orderdetail/:id/delete', orderdetail_controller.orderdetail_delete_post);

// GET request to update OrderDetail.
router.get('/orderdetail/:id/update', orderdetail_controller.orderdetail_update_get);

// POST request to update OrderDetail.
router.post('/orderdetail/:id/update', orderdetail_controller.orderdetail_update_post);

// GET request for one OrderDetail.
router.get('/orderdetail/:id', orderdetail_controller.orderdetail_detail);

// GET request for list of all OrderDetail.
router.get('/orderdetails', orderdetail_controller.orderdetail_list);

module.exports = router;
