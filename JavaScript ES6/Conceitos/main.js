// ao rodar yarn dev, o babel irá rodar o script dentro de package.json para converter o main para o bundle.js

class List {
    constructor() {
        this.data = [];
    }

    add(data) {
        this.data.push(data);
        console.log(this.data);
    }
}



class TodoList extends List {
    constructor() {
        super(); // chama o construtor da classe pai

        this.usuario = 'Mateus';
    }
    mostraUsuario() {
        console.log(this.usuario);
    }
}

var MinhaLista = new TodoList();
MinhaLista.mostraUsuario();

document.getElementById('novotodo').onclick = function () {
    MinhaLista.add('Novo Todo');
}


// Exemplo de classe com método static
// Não precisa instanciar a classe para acessar os métodos
class Matematica {
    static soma(a, b) {
        return a + b;
    }
}

document.getElementById('novotodo2').onclick = function () {
    console.log(Matematica.soma(1,2));
}
