import axios from "axios";
import "regenerator-runtime/runtime.js";

class Api{
   static async getUserInfo(username){
       try {
           
        const response = await axios.get(`https://api.github.com/users/${username}`);

        console.log(response);
       } catch (err) {
           console.warn('Erro na API');
       }
   }
}

Api.getUserInfo('sirmd');