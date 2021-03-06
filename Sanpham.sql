Create database KhachHang
go
use KhachHang
go
--------------------------

create table SANPHAM(
MASP char(5),
TENSP nvarchar(30),
NHASX char(10),
SOLUONG int,
GIA int,
NGAYNHAP DATE,
NGAYBAN DATE
PRIMARY KEY (MASP)
)

CREATE TABLE CART(
MACART CHAR(5),
MASP CHAR(5),
SOLUONGSP INT,
TONGGIA INT,
NGAY DATE
PRIMARY KEY (MACART)
)

alter table CART add
	constraint FK_CART_SANPHAM foreign key (MASP) references SANPHAM (MASP)
	
insert into SANPHAM values('IP01',N'Iphone SXMAX hồng 64GB','Apple',4,22990000,'02-20-2019',NULL)
insert into SANPHAM values('IP02',N'Iphone SXMAX vàng 64GB','Apple',2,22990000,'02-26-2019',NULL)
insert into SANPHAM values('IP03',N'Iphone 8 hồng 64GB','Apple',3,16000000,'02-22-2019',NULL)
insert into SANPHAM values('IP04',N'Iphone 8 vàng 64GB','Apple',4,16000000,'02-21-2019',NULL)
insert into SANPHAM values('SS01',N'SamSung Note 10','SamSung',6,16000000,'02-24-2019',NULL)

insert into CART values('CA01','IP01',3,68770000,'03-02-2019')
insert into CART values('CA02','IP03',1,16000000,'05-02-2019')
insert into CART values('CA03','SS01',2,32000000,'03-02-2019')
