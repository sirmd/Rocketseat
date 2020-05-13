import "regenerator-runtime/runtime.js";
import axios from 'axios';

async function getUserFromGithub(user) {
    try {
        const response = await axios.get(`https://api.github.com/users/${user}`);
        console.log(response);
    } catch (err) {
        console.log(`Usuário ${user} não existe`);
        
    }
}
 
getUserFromGithub('sirmd');
getUserFromGithub('diego3g124123');