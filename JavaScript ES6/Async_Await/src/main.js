// import axios from "axios";
// import "regenerator-runtime/runtime.js";

// class Api{
//    static async getUserInfo(username){
//        try {
           
//         const response = await axios.get(`https://api.github.com/users/${username}`);

//         console.log(response);
//        } catch (err) {
//            console.warn('Erro na API');
//        }
//    }
// }

// Api.getUserInfo('sirmd');

import "regenerator-runtime/runtime.js";
// Funão delay aciona o .then após 1s

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

const umPorSegundo = async () => {
 
    await delay();
    console.log('1s');
    await delay();
    console.log('2s');
    await delay();
    console.log('3s');
 
}
umPorSegundo();