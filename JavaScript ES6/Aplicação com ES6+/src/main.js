import "regenerator-runtime/runtime.js";
import axios from 'axios';

class App{
    constructor(){
        this.repositories = [];

        this.formElement = document.getElementById("repo-form");
        this.listElement = document.getElementById("repo-list");

        this.registerHandlers();

    }

    registerHandlers(){
       this.formElement.onsubmit = event => this.addRepository(event);
    }

    addRepository(event){
        event.preventDefault();

        this.repositories.push({
            name: 'rocketseat.com.br',
            description: 'Tire a sua ideia do papel e dê vida à sua startup',
            avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?v=4',
            html_url: 'http://github.com/rocketseat',
        });

        this.render();
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
            likeElement.setAttribute('target', '_blank');
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