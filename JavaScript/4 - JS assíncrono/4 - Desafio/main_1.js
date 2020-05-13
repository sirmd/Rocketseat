function checaIdade(idade) {

    return new Promise(function (resolve, reject) {

        if (idade > 18) {
            resolve('Maior que 18');
        } else {
            reject('Menor que 18');
        }


    });

}

checaIdade(20)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.warn(error);
    });