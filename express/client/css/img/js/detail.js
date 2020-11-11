var name = document.querySelector('#name');
var age = document.querySelector('#age');
var classe = document.querySelector('#classe');


var url = window.location;
console.log(url);

var elevesId = url.hash;

elevesId = elevesId.substring(1);
console.log(elevesId);

var xhttp = new XMLHttpRequest ();

xhttp.open('GET', '/eleves/' + elevesId, true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText);
        name.value = data.name;
        age.value = data.age;
        classe.value = data.classe;
    }
};

function modify() {
    var tmp = {
        name : name.value,
        age : age.value,
        classe : classe.value,
    };
    xhttp.open('PUT', '/eleves/' + elevesId, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) =>{
    e.preventDefault();
    modify();
    window.location.href = '/pages/eleves.html';
});