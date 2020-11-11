var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
        var data = JSON.parse(this.responseText);

        data.forEach(elt => {
            newLi(elt);
        });
    }
}

var body = document.querySelector('body');

var maListe = document.createElement('ul');
body.appendChild(maListe);

function newLi(data) {
    var tmp = document.createElement('li');

    var div = document.createElement('div');
    tmp.appendChild(div);

    for(const elt in data){
        var tmp2 = document.createElement('span');
        tmp2.innerText = elt + ': ' + data[elt];
        var br = document.createElement('br');
        div.appendChild(tmp2);
        div.appendChild(br);
    }
    maListe.appendChild(tmp);
}
xhttp.open("GET", "/liste", true);

xhttp.send();