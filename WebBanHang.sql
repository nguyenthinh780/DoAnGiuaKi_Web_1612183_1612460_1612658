create database WEBBANHANG
use WEBBANHANG

create table taiKhoan
(
	id_tk char(20) not null,/*tên đăng nhập*/
	matkhau char(20) not null,
	hoten nvarchar(50),
	gioitinh bit,/*0: nam, 1: nữ*/
	ngaysinh date,
	sodt char(12),
	email char(50),
	vaitro bit, /*0: khách hàng, 1: quản trị*/
	constraint pk_taikhoan primary key (id_tk)
)

create table gianHang
(
	id_gh int not null,/*số thứ tự*/
	tengh nvarchar(50),
	id_tk char(20),
	ngaytao date,/*ngày tạo gian hàng*/
	constraint pk_gianhang primary key (id_gh)
)

create table donHang
(
	id_dh int not null,/*số thứ tự*/
	id_tk char(20),/*người đặt hàng*/
	ngaydat date,
	giaohang int,/*0: chưa giao, 1: đang giao, 2: đã giao*/
	constraint pk_donhang primary key (id_dh)
)

alter table gianHang add constraint fk_gianhang_taikhoan foreign key (id_tk) references taiKhoan(id_tk)
alter table donHang add constraint fk_donhang_taikhoan foreign key (id_tk) references taiKhoan(id_tk)

 