var xhttp = new XMLHttpRequest();

function addEleve(){

    var name = document.querySelector('#name');
    var age = document.querySelector('#age');
    var classe = document.querySelector('#classe');
    
    var tmp = {
        name: name.value,
        age: age.value,
        classe: classe.value,
    };

    xhttp.open('POST', '/eleves', true);
    xhttp.setRequestHeader('Content-type', 'Application/json');
    xhttp.send(JSON.stringify(tmp));
    addOneLine(tmp);
    document.forms['formSpe'].reset();
    window.location.href = '/pages/eleves.html';
};

function deleteMovie(id){
    xhttp.open('DELETE', '/eleves/' + id,true);
    xhttp.send();
    window.location.href = '/pages/eleves.html';
}


function addOneLine(data) {
    var tab = document.querySelector('#eleves');
    var newLine = document.createElement('tr');
    for (const key in data){
        if(key != '_id' && key != '__v') {
            var tmp = document.createElement('td');
            tmp.innerText = data[key];
            newLine.appendChild(tmp)
        }
    }

    var tdLink = document.createElement('td');
    var link = document.createElement('a');
    link.href = '/pages/detail.html#' + data._id;
    link.innerText = 'Détails';
    tdLink.appendChild(link);
    newLine.appendChild(tdLink);

    var tdSuppr = document.createElement('td');
    var btnSuppr = document.createElement('button');
    btnSuppr.innerText = 'Suppression';
    btnSuppr.classList.add('btn', 'btn-outline-danger');
    tdSuppr.appendChild(btnSuppr);
    newLine.appendChild(tdSuppr);

    btnSuppr.addEventListener('click', (e) => {
        deleteEleve(data._id);
    });

    tab.appendChild(newLine);
}

var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => { 
    e.preventDefault();

    addEleve();
});

xhttp.open('GET', '/movies', true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(this.responseText);
        data.forEach(elt => {
            addOneLine(elt);
        });
    }
};