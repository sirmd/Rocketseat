"use strict";

var usuario = {
  nome: 'Mateus',
  idade: 28,
  endereco: {
    cidade: 'Farroupilha',
    estado: 'RS'
  }
}; //desestruturacao: busca o nome, a idade e a cidade do usuario

var nome = usuario.nome,
    idade = usuario.idade,
    cidade = usuario.endereco.cidade;
console.log(nome);
console.log(idade);
console.log(cidade); // O conceito pode ser utilizado nos parâmetros de uma função

function mostraNome(_ref) {
  var nome = _ref.nome,
      idade = _ref.idade,
      cidade = _ref.endereco.cidade;
  console.log(nome, idade, cidade);
}

mostraNome(usuario);
