var rIndex=0;//index của dòng cần chỉnh sửa
function clickRow(x) {
  rIndex=x.rowIndex;
  document.getElementById("tentk").value  = x.cells[0].innerHTML;
  document.getElementById("matk").value  = x.cells[1].innerHTML;
  document.getElementById("hoten").value  = x.cells[2].innerHTML;
  document.getElementById("gtinh").value  = x.cells[3].innerHTML;
  document.getElementById("nsinh").value  = x.cells[4].innerHTML;
  document.getElementById("email").value  = x.cells[5].innerHTML;
}

function clickChange() {
  var table = document.getElementById("tableId");
  table.rows[rIndex].cells[0].innerHTML=document.getElementById("tentk").value;
  table.rows[rIndex].cells[1].innerHTML=document.getElementById("matk").value;
  table.rows[rIndex].cells[2].innerHTML=document.getElementById("hoten").value;
  table.rows[rIndex].cells[3].innerHTML=document.getElementById("gtinh").value;
  table.rows[rIndex].cells[4].innerHTML=document.getElementById("nsinh").value;
  table.rows[rIndex].cells[5].innerHTML=document.getElementById("email").value;
}
