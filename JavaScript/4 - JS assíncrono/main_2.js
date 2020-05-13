var minhaPromise = function () {

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.github.com/users/sirmd');
        xhr.send(null);

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) { //sucesso

                    resolve(JSON.parse(xhr.responseText));

                } else {

                    reject('Erro na requisição');
                }
            }
        }
    });

}
// .then é chamado quando a requisição obteve sucesso (resolve)
// .catch é chamado quando cair no reject
minhaPromise()
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.warn(error);
    });