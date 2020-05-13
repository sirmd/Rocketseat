// AJAX
var xhr = new XMLHttpRequest();

//Requisição assíncrona
xhr.open('GET', 'https://api.github.com/users/sirmd');
xhr.send(null);

// quando a requisição estiver pronta, mostra o texto do response
// no console
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText));
    }
}