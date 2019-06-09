#! /usr/bin/env node

console.log('This script populates account, product to your database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Account = require('./models/account')
var Stall = require('./models/stall')
var Product = require('./models/product')
var Order = require('./models/order')
var OrderDetail = require('./models/orderdetail')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser:true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var accounts = []
var stalls = []
var products = []
var orders = []
var orderdetails = []

function accountCreate(login_name, password, name, birth, email, phone, type, cb) {
  accountdetail = {login_name:login_name , password: password , type:type }
  if (name != false) accountdetail.name = name
  if (birth != false) accountdetail.birth = birth
  if (email != false) accountdetail.email = email
  if (phone != false) accountdetail.phone = phone

  var account = new Account(accountdetail);

  account.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Account: ' + account);
    accounts.push(account)
    cb(null, account)
  }  );
}

function stallCreate(stall_name, stall_description, cb) {
  stalldetail = {
    stall_name: stall_name
  }
  if (stall_description != false) stalldetail.stall_description = stall_description

  var stall = new Stall(stalldetail);
  stall.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Stall: ' + stall);
    stalls.push(stall)
    cb(null, stall)
  }  );
}

function productCreate(product_name, stall_id, brand, product_description, price, cb) {
  productdetail = {
    product_name: product_name,
    stall_id: stall_id,
    price: price }
  if (brand != false)  productdetail.brand = brand
  if (product_description != false)  productdetail.product_description = product_description

  var product = new Product(productdetail);

  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}

function orderCreate(order_date, type, cb) {
  orderdetail = {
    type: type
  }
  if (order_date != false)  orderdetail.order_date = order_date

  var order = new Order(orderdetail);
  order.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Order: ' + order);
    orders.push(order)
    cb(null, order)
  }  );
}

function orderdetailCreate(order_id, product_id, number, cb) {
  orderdetaildetail = {
    order_id: order_id,
    product_id: product_id,
    number: number
  }

  var orderdetail = new OrderDetail(orderdetaildetail);
  orderdetail.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New OrderDetail: ' + orderdetail);
    orderdetails.push(orderdetail)
    cb(null, orderdetail)
  }  );
}

function createAccountStallOrder(cb) {
    async.series([
        function(callback) {
          accountCreate('admin', '123456', 'nguyen van admin', '1998-05-15', 'admin@admin.com','123456','Admin', callback);
        },
        function(callback) {
          accountCreate('guest', '123456', 'nguyen thi guest', '1998-05-15', 'guest@guest.com', false,'Guest', callback);
        },
        function(callback) {
          accountCreate('customer', '123456', 'nguyen van customer', '1998-05-15', 'customer@customer.com','654321','Customer', callback);
        },
        function(callback) {
          stallCreate('Điện thoại', false, callback);
        },
        function(callback) {
          stallCreate('Laptop', false, callback);
        },
        function(callback) {
          stallCreate('Phụ kiện', 'Dây sạc, tai nghe và nhiều thứ khác', callback);
        },
        function(callback) {
          orderCreate(false, 'Chưa giao', callback);
        },
        function(callback) {
          orderCreate(false, 'Đang giao', callback);
        },
        function(callback) {
          orderCreate(false, 'Đã giao', callback);
        }
        ],
        // optional callback
        cb);
}


function createProduct(cb) {
    async.parallel([
        function(callback) {
          productCreate('Iphone 7', stalls[0], 'Apple', 'Điện thoại apple', 9000000, callback);
        },
        function(callback) {
          productCreate('Galaxy 10', stalls[0], 'Samsung', 'Điện thoại samsung', 20000000, callback);
        },
        function(callback) {
          productCreate('Macstall Pro', stalls[1], 'Apple', 'Laptop apple', 30000000, callback);
        }
        ],
        // optional callback
        cb);
}

function createOrderDetail(cb) {
    async.parallel([
        function(callback) {
          orderdetailCreate(orders[0], products[0], 1, callback)
        },
        function(callback) {
          orderdetailCreate(orders[1], products[1], 2, callback)
        },
        function(callback) {
          orderdetailCreate(orders[2], products[2], 1, callback)
        },
        function(callback) {
          orderdetailCreate(orders[2], products[0], 1, callback)
        },
        function(callback) {
          orderdetailCreate(orders[2], products[1], 3, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createAccountStallOrder,
    createProduct,
    createOrderDetail
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Accounts: '+ accounts);

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
