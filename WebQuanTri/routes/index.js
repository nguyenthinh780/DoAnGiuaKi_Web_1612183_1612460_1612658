var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/TaiKhoan', function(req, res, next) {
  res.render('QLTaiKhoan', {page:'TaiKhoan', menuId:'taikhoan'});
});

router.get('/GianHang', function(req, res, next) {
  res.render('QLGianHang', {page:'GianHang', menuId:'gianhang'});
});

router.get('/DonHang', function(req, res, next) {
  res.render('QLDonHang', {page:'DonHang', menuId:'donhang'});
});

router.get('/ThongKe', function(req, res, next) {
  res.render('ThongKe', {page:'ThongKe', menuId:'thongke'});
});

module.exports = router;
