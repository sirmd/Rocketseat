//necessario instalar o pacote.
// yarn add @babel/plugin-proposal-object-rest-spread
// adicionar ao array de plugins dentro do babelrc: "plugins": ["@babel/plugin-proposal-object-rest-spread"]

//REST
//serve para pegar o resto das propriedades

const usuarios = {
    nome: 'Mateus',
    idade: 28,
    empresa: 'Tramontina'
};

const { nome, ...resto } = usuarios;

console.log(nome); // Mateus
console.log(resto);// {idade: 28, empresa: 'Tramontina'}


// outro exemplo, a e b gravam os 2 primeiros itens do array e c grava o resto dos itens

const arr = [1, 2, 3, 4];
const [a, b, ...c] = arr;

console.log(a, b, c);


// outro exemplo
// Dessa forma, apenas é necessário declarar os 2 primeiros parâmetros, pois o params pode receber 'n' parâmetros
function soma(a, b, ...params) {
    return a + b + params.reduce((total, next) => total + next)
};

console.log(soma(1, 3, 4, 5));


// SPREAD
// passa os dados de um array para outra estrutura de dados

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const arr3 = [...arr1, ...arr2];

console.log(arr3); // [1, 2, 3, 4, 5, 6]



// outro exemplo, criar outro usuário baseado no usuario 1
const usuario1 = {
    nome: 'Mateus',
    idade: 28,
    empresa: 'Tramontina'
};

// usuario 2 será criado com os mesmos valores do usuário 1, porém, o nome será 'Amanda'
const usuario2 = { ...usuario1, nome: 'Amanda'};

console.log(usuario2);

