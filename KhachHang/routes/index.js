var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/iphonesxmax', function(req, res, next) {
  res.render('iphoneSX', {page:'iphoneSX', menuId:'iphoneSX'});
});

router.get('/iphone8', function(req, res, next) {
  res.render('iphone8', {page:'iphone8', menuId:'iphone8'});
});

router.get('/note10', function(req, res, next) {
  res.render('note10', {page:'note10', menuId:'note10'});
});

router.get('/cart', function(req, res, next) {
  res.render('cart', {page:'cart', menuId:'cart'});
});

module.exports = router;
