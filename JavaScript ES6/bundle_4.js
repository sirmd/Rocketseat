"use strict";

var arr = [1, 3, 4, 5, 6]; // map: percorre  o array e retorna o dobro do valor de cada item
// function(item){return item * 2} 
// usando arrow function:
// item => item*2
// parametro => retorno

var newArr = arr.map(function (item) {
  return item * 2;
});
console.log(newArr); //uma constante pode ser uma função também

var teste = function teste() {
  return 'teste';
}; // para retornar um objeto, é necessário utilizar parênteses, pois as chaves fazem parte do corpo da função


var teste2 = function teste2() {
  return {
    nome: 'Mateus'
  };
};

console.log(teste());
console.log(teste2());
