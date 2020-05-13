function soma(a = 3, b = 6) {
    return a + b;
}

// pode ser com arrow function
const subtracao = (a = 3, b = 6) => a - b;

console.log(soma());
console.log(subtracao());