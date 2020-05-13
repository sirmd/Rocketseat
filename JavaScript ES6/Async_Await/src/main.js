import "regenerator-runtime/runtime.js";
import axios from 'axios';

const buscaUsuario = async (usuario) => {
try {
    const response = await axios.get(`https://api.github.com/users/${usuario}`);
    console.log(response);
} catch (error) {
    console.log(`O usuário ${usuario} não existe`)
}
}
buscaUsuario('sirmd');