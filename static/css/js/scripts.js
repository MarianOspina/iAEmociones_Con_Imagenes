const fileInput = document.getElementById('file-upload');
const image = document.getElementById('uploaded-image');
const predictionText = document.getElementById('prediction-text');
const detectButton = document.getElementById('detectButton');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            image.src = reader.result;
            image.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

detectButton.addEventListener('click', async function() {
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:3001/prediccion', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al subir la imagen.');
            }

            const data = await response.json();
            switch (data) {
                case 0:
                    predictionText.textContent = 'La foto indica que estás enojado';
                    break;
                case 1:
                    predictionText.textContent = 'La foto indica que estás estresado';
                    break;
                case 2:
                    predictionText.textContent = 'La foto indica que estás feliz';
                    break;
                case 3:
                    predictionText.textContent = 'La foto indica que estás llorando';
                    break;
                default:
                    predictionText.textContent = 'No se pudo determinar la emoción';
            }
        } catch (error) {
            console.error('Error:', error);
            predictionText.textContent = 'Error al realizar la solicitud';
        }
    }
});
