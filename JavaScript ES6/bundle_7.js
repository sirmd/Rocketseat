"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//necessario instalar o pacote.
// yarn add @babel/plugin-proposal-object-rest-spread
// adicionar ao array de plugins dentro do babelrc: "plugins": ["@babel/plugin-proposal-object-rest-spread"]
//REST
//serve para pegar o resto das propriedades
var usuarios = {
  nome: 'Mateus',
  idade: 28,
  empresa: 'Tramontina'
};

var nome = usuarios.nome,
    resto = _objectWithoutProperties(usuarios, ["nome"]);

console.log(nome); // Mateus

console.log(resto); // {idade: 28, empresa: 'Tramontina'}
// outro exemplo, a e b gravam os 2 primeiros itens do array e c grava o resto dos itens

var arr = [1, 2, 3, 4];
var a = arr[0],
    b = arr[1],
    c = arr.slice(2);
console.log(a, b, c); // outro exemplo
// Dessa forma, apenas é necessário declarar os 2 primeiros parâmetros, pois o params pode receber 'n' parâmetros

function soma(a, b) {
  for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  return a + b + params.reduce(function (total, next) {
    return total + next;
  });
}

;
console.log(soma(1, 3, 4, 5)); // SPREAD
// passa os dados de um array para outra estrutura de dados

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [].concat(arr1, arr2);
console.log(arr3); // [1, 2, 3, 4, 5, 6]
// outro exemplo, criar outro usuário baseado no usuario 1

var usuario1 = {
  nome: 'Mateus',
  idade: 28,
  empresa: 'Tramontina'
}; // usuario 2 será criado com os mesmos valores do usuário 1, porém, o nome será 'Amanda'

var usuario2 = _objectSpread({}, usuario1, {
  nome: 'Amanda'
});

console.log(usuario2);
