function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myQuality() {
    var input,minus,plus;
    input = document.getElementById("qua");
    minus = document.getElementById("minus");
    plus = document.getElementById("plus");
    if(onclick(minus)){
        input --;
        console.log(input);
    }
    if(onclick(plus)){
        input ++;
        console.log(input);
    }

}