#! /usr/bin/env node

console.log('This script populates account to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

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
//var Book = require('./models/book')
//var Author = require('./models/author')
//var Genre = require('./models/genre')
//var BookInstance = require('./models/bookinstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser:true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var accounts = []
/*var authors = []
var genres = []
var books = []
var bookinstances = []*/


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

function createAccount(cb) {
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
        ],
        // optional callback
        cb);
}

async.series([
    createAccount
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
