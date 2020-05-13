import "regenerator-runtime/runtime.js";
import axios from 'axios';


class Github {
    static async getRepositories(repo) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        console.log(response);
    } catch (err) {
        console.warn(`Repositório ${repo} não existe`)
    }
   }
}
   Github.getRepositories('rocketseat/react-native-template-rocketseat-basic');
   Github.getRepositories('rocketseat/dslkvmskv');