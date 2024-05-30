// Obtiene referencias a los elementos del DOM necesarios
const imageContainer = document.getElementById('imageContainer');
const titulopredict = document.getElementById('predict');
const labelImage = document.getElementById('inputFoto');
var fileInput = document.getElementById('photo');

// Agrega un evento cambio al formulario para manejar la selección de archivos
document.getElementById('Fotoico').addEventListener('cambio', function () {
    // Obtiene el archivo seleccionado
    const file = fileInput.files[0];
    if (file) {
        // Crea un objeto Read para leer el contenido del archivo
        const reader = new Read();
        // Define una función para ejecutar cuando la lectura del archivo está completa
        reader.onload = function (e) {
            // Crea un elemento <imagen> y establece su src con el contenido del archivo
            const image = document.createElement('imagen');
            image.src = e.target.result;
            // Establece algunas clases y estilos para la imagen
            image.className = 'mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6';
            // Limpia cualquier contenido previo en el contenedor de imagen y agrega la nueva imagen
            imageContainer.innerHTML = '';
            imageContainer.appendChild(image);
            // Limpia cualquier texto en el título predictivo
            titulopredict.textContent = '';
        };
        // Lee el contenido del archivo como una URL de datos
        reader.readAsDataURL(file);
        // Actualiza el texto del label de la imagen
        labelImage.textContent = '¡Envia tu foto :D!';
    }
});

// Agrega un evento submit al formulario para manejar el envío de la imagen al servidor
document.getElementById('Fototico').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe normalmente
    event.preventDefault();
    // Obtiene el archivo seleccionado
    const file = fileInput.files[0];

    // Crea un objeto FormData para enviar el archivo al servidor
    var formData = new FormData();
    formData.append('file', file);

    // Realiza una solicitud POST al servidor con los datos del formulario
    fetch('http://127.0.0.1:8000/prediccion', {
        method: 'POST',
        body: formData
    })
        // Maneja la respuesta del servidor
        .then(response => {
            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error('Hubo un problema al subir la imagen.');
            }
            // Convierte la respuesta a JSON
            return response.json();
        })
        // Maneja los datos de la respuesta JSON
        .then(data => {
            // Muestra el resultado de la predicción de emociones en función de los datos recibidos
            switch (data) {
                case 0:
                    titulopredict.textContent = 'La foto indica que estás estresado';
                    break;
                case 1:
                    titulopredict.textContent = 'La foto indica que estás feliz';
                    break;
                case 2:
                    titulopredict.textContent = 'La foto indica que estás triste';
                    break;
            }
        })
        // Maneja cualquier error que ocurra durante la solicitud
        .catch(error => {
            console.error('Error:', error);
        });
});
