var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var repos = [];

function renderList() {
    // Esvazia a lista
    listElement.innerHTML = '';

    for (repo of repos) {
        var repoElement = document.createElement('li');
        var repoText = document.createTextNode(repo);

        repoElement.appendChild(repoText);
        listElement.appendChild(repoElement);
        
    }
    if (repos.length == 0) {
        var repoText = document.createTextNode("Nenhum repositório encontrado!");
        var repoElement = document.createElement('li');
        repoElement.appendChild(repoText);
        listElement.appendChild(repoElement);
        
    }
}

function loadingList() {
    var element = document.createElement('li');
    var text = document.createTextNode('Carregando...');
    listElement.innerHTML = '';
    element.appendChild(text);
    listElement.appendChild(element);
}

buttonElement.onclick = buscaUser;

function buscaUser() {
    var user = inputElement.value;
    var link = 'https://api.github.com/users/'+ user + '/repos';
    loadingList();
    axios.get(link)
        .then(function (response) {
            repos = [];
            for (let i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;
                repos.push(name);
                
            }
            console.log(response);
            renderList();
        })
        .catch(function (error) {
            console.warn(error);
        });
}

