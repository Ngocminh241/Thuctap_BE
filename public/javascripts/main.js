let button = document.getElementsByClassName('list-group-item');

function btnClick(){
    button.classlist.add('active-item')
    console.log("okoko");
}

button.onclick = btnClick;