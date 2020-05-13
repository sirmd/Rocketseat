import "regenerator-runtime/runtime.js";
import api from "./api";

class App{
    constructor(){
        this.repositories = [];

        this.formElement = document.getElementById("repo-form");
        this.inputElement = document.querySelector('input[name=repository]');
        this.listElement = document.getElementById("repo-list");

        this.registerHandlers();

    }

    registerHandlers(){
       this.formElement.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if (loading) {
            const loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Carregando'));
            loadingElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadingElement);
        }
        else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();
        this.setLoading();

        const repoInput = this.inputElement.value;

        if (repoInput.length === 0) {
            return;
        }
        try {
            const response = await api.get(`/repos/${repoInput}`);
            const {name, description, html_url, owner: {avatar_url}} = response.data;
            

            console.log(name, description, html_url, avatar_url);

            this.repositories.push({
                name: name,
                description: description,
                avatar_url: avatar_url,
                html_url: html_url,
            });

            this.inputElement.value = "";

            this.render();
        }
        catch(err){
            alert('Usuário/Repositório não encontrado');
            this.inputElement.focus();
        }

        this.setLoading(false);
    }

    render(){
        this.listElement.innerHTML = ''; // apaga lista da tela

        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repo.avatar_url);

            let titleElement = document.createElement('strong');
            titleElement.appendChild(document.createTextNode(repo.name));

            let descriptionElement = document.createElement('p');
            descriptionElement.appendChild(document.createTextNode(repo.description));

            let likeElement = document.createElement('a');
            likeElement.setAttribute('target', repo.html_url);
            likeElement.setAttribute('href', repo.html_url);
            likeElement.appendChild(document.createTextNode('Acessar'));

            let listItemElement = document.createElement('li');
            listItemElement.appendChild(imgElement);
            listItemElement.appendChild(titleElement);
            listItemElement.appendChild(descriptionElement);
            listItemElement.appendChild(likeElement);

            this.listElement.appendChild(listItemElement);
            
        });
    }
}

new App();