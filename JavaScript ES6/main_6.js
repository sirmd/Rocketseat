const usuario = {
    nome: 'Mateus',
    idade: 28,
    endereco: {
        cidade: 'Farroupilha',
        estado: 'RS',
    },
};

//desestruturacao: busca o nome, a idade e a cidade do usuario
const { nome, idade, endereco: { cidade } } = usuario;

console.log(nome);
console.log(idade);
console.log(cidade);


// O conceito pode ser utilizado nos parâmetros de uma função
function mostraNome({ nome, idade, endereco: { cidade } }) {
    console.log(nome, idade, cidade);
}

mostraNome(usuario);
