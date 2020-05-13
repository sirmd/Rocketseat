var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var toDos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderToDo() {
    // Esvazia a lista
    listElement.innerHTML = '';

    for (todo of toDos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);
        var linkElement = document.createElement('a');
        var linkText = document.createTextNode(' Excluir');

        linkElement.setAttribute('href', '#');

        linkElement.appendChild(linkText);
        var pos = toDos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');


        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
        
    }
}

renderToDo();
buttonElement.onclick = addTodo;

function addTodo() {
    var todoText = inputElement.value;

    toDos.push(todoText); //adiciona texto ao final do array
    inputElement.value = '';
    renderToDo();
    saveToStorage();
    
}

function deleteTodo(pos) {
    toDos.splice(pos, 1);
    renderToDo();
    saveToStorage();
}

function saveToStorage() {
    
    localStorage.setItem('list_todos', JSON.stringify(toDos));
}