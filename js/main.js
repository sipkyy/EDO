const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=historia%20periodo%20edo';

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('No se pudo cargar la API');
    }
    return response.json();
})
.then(data => {
    console.log(data.items);
    let datos_api = document.getElementById('contenedor-api');
    (data.items).forEach(libro => {
        datos_api.innerHTML += '<li><a href="'+libro.volumeInfo.infoLink+'">'+(libro.volumeInfo.title)+'</a></li>';
    });

})
.catch(error => {
    console.error('Ocurrió un error al consumir la API: ' + error);

});
