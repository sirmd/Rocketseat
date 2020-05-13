const arr = [1, 3, 4, 5, 6];

// map: percorre  o array e retorna o dobro do valor de cada item
// function(item){return item * 2} 
// usando arrow function:
// item => item*2
// parametro => retorno
const newArr = arr.map(item => item * 2)

console.log(newArr);

//uma constante pode ser uma função também
const teste = () => 'teste';

// para retornar um objeto, é necessário utilizar parênteses, pois as chaves fazem parte do corpo da função
const teste2 = () => ({ nome: 'Mateus'});

console.log(teste());
console.log(teste2());