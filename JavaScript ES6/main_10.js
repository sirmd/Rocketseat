// 1º Exercício
/* 
class Usuario{
    constructor(){
        this.usuario = "";
        this.senha = "";
        this.admin = false;
    }
    

    isAdmin(){
        return this.admin;
    }
}

class Admin extends Usuario{
    
    constructor(){
        super();

        this.admin = true;
    }
}

const User1 = new Usuario('user', 123456);
const Adm = new Admin('adm', 123456);

console.log(User1.isAdmin());
console.log(Adm.isAdmin()); 
*/

// 2º Exercício
/* 
const usuarios = [
    { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
    { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
    { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];

//map: Retornar todas as idades
const newArr1 = usuarios.map(item => item.idade);

console.log(newArr1);

// filter: retornar apenas usuários da Rocketseat com mais de 18 anos
const newArr2 = usuarios.filter(function (item) {
    return (item.empresa === 'Rocketseat' && item.idade > 18);
});
console.log(newArr2);

// find: procurar o usuário que trabalha na empresa Google
const user = usuarios.find(item => item.empresa === 'Google');
console.log(user);

// map e filter: Multiplicar a idade de todos por 2 e filtrar os que possuem mais de 50 anos
// o map retorna um array com os objetos com idade multiplicada por 2
// o filter filtra esse array gerado no map para apenas os objetos com idade menor ou igual a 50
const usuarios2 = usuarios.map(user => ({ nome: user.nome, idade: user.idade * 2, empresa: user.empresa })).filter(user => user.idade <= 50);

console.log(usuarios2);
 */

// 3º Exercício
//3.1
/* 
const arr = [1, 2, 3, 4, 5];

const oldArr = arr.map(function (item) {
    return item + 10;
});

//convetida para arrow function:

const newArr = arr.map(item => item + 10);
console.log(newArr);

//3.2
const usuario = { nome: 'Diego', idade: 23 };
function mostraIdade(usuario) {
    return usuario.idade;
}
mostraIdade(usuario);

//convertida:
const mostraidade2 = () => usuario.idade;
console.log(mostraidade2(usuario));

//3.3
const nome = "Diego";
const idade = 23;
function mostraUsuario(nome = 'Diego', idade = 18) {
    return { nome, idade };
}
mostraUsuario(nome, idade);
mostraUsuario(nome);

//convetida
const mostraUsuario2 = (nome = 'Diego', idade = 18) => ({ nome, idade });

console.log(mostraUsuario2(nome, idade));
console.log(mostraUsuario2(nome));

//3.4
const promise = function () {
    return new Promise(function (resolve, reject) {
        return resolve();
    })
}

//convertida:
const promise2 = () => new Promise((resolve, reject) => resolve());
 */


// 4º Exercício:
//4.1
/* 
const empresa = {
    nome: 'Rocketseat',
    endereco: {
        cidade: 'Rio do Sul',
        estado: 'SC',
    }
};

const { nome, endereco: { cidade, estado } } = empresa;

console.log(nome); // Rocketseat
console.log(cidade); // Rio do Sul
console.log(estado); // SC

//4.2

const usuario = { nome: 'Diego' };
function mostraInfo(usuario) {
    return `${usuario.nome} tem ${usuario.idade} anos.`;
}

//utilizando desestruturação
mostraInfo({ nome: 'Diego', idade: 23 });

function mostraInfo2({ nome, idade = 23 }) {
    return `${nome} tem ${idade} anos.`;
}

console.log(mostraInfo2(usuario)); 
*/


// 5º Exercício
// 5.1 - REST
const arr = [1, 2, 3, 4, 5, 6];

const [x, ...y] = arr;

console.log(x); // 1
console.log(y); // [2, 3, 4, 5, 6]


function soma(...params) {
    return params.reduce((total, next) => total + next);
}

console.log(soma(1, 2, 3, 4, 5, 6)); // 21
console.log(soma(1, 2)); // 3


// 5.2 - SPREAD
const usuario = {
    nome: 'Diego',
    idade: 23,
    endereco: {
        cidade: 'Rio do Sul',
        uf: 'SC',
        pais: 'Brasil',
    }
};
const usuario2 = { ...usuario, nome: 'Gabriel' };
const usuario3 = { ...usuario, endereco: { ...usuario.endereco, cidade: 'Lontras' } };

console.log(usuario2, usuario3);


// 6º Exercício
const usuario_6 = 'Diego';
const idade_6 = 23;
console.log('O usuário ' + usuario_6 + ' possui ' + idade_6 + ' anos');

// utilizando template literals:
console.log(`O usuário ${usuario_6} possui ${idade_6} anos`);

// 7º Exercício:
const nome = 'Diego';
const idade = 23;
const usuario_7 = {
    nome: nome,
    idade: idade,
    cidade: 'Rio do Sul'
};

// utilizando object short syntax:
const usuario2_7 = {
    nome,
    idade,
    cidade: 'Rio do Sul'
};

console.log(usuario_7, usuario2_7);