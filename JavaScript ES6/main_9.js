const nome = 'Mateus';
const idade = 28;

const usuario = {
    nome: nome,
    idade: idade,
    empresa: 'Tramontina'
};

// usando object short syntax:

const usuario2 = {
    nome,
    idade,
    empresa: 'Tramontina'
};

console.log(usuario);
console.log(usuario2);