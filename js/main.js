const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=historia%20periodo%20edo';

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('No se pudo cargar la API');
    }
    return response.json();
})
.then(data => {
    let autorExcluido = 'James Clavell';
    let librosFiltrados = data.items.filter(item => {
      let autores = item.volumeInfo.authors || [];
      return !autores.includes(autorExcluido);
    });

    console.log(librosFiltrados);
    let datos_api = document.getElementById('contenedor-api');
    (librosFiltrados).forEach(libro => {
        let columna_descripcion = 
        '<td class="celda">'+
            '<a target="_blank" href="'+libro.volumeInfo.infoLink+'">'+(libro.volumeInfo.title).toUpperCase()+'</a>'+
            '<br>'+
            '◾ Autor: '+libro.volumeInfo.authors.join(", ")+
            '<br>'+
            '◾ Fecha de publicación: '+libro.volumeInfo.publishedDate+
            '<br>'+
            '◾ Descripción: '+libro.volumeInfo.description+
        '</td>'; 
        
        if (libro.volumeInfo.imageLinks && libro.volumeInfo.imageLinks.smallThumbnail){
            datos_api.innerHTML += '<tr><td class="celda"><img src="'+libro.volumeInfo.imageLinks.smallThumbnail+'" width="120" alt="'+libro.volumeInfo.title+'"></td>'+columna_descripcion+'</tr>';
        }else{
            datos_api.innerHTML += '<tr><td class="celda"><img src="./img/Mitsubaaoi.svg.png" width="120" alt="'+libro.volumeInfo.title+'"></td>'+columna_descripcion+'</tr>';
        }
    });

})
.catch(error => {
    console.error('Ocurrió un error al consumir la API: ' + error);

});
