from flask import Flask, render_template, request, jsonify
import requests
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# Enviar la imagen al servidor FastAPI y obtener la emoción detectada
def detect_emotion(image):
    files = {'file': image}
    response = requests.post('http://localhost:8000/predict/', files=files)
    data = response.json()
    emotion = data['emocion_detectada']
    return emotion

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    image = request.files['image']
    img = Image.open(BytesIO(image.read()))
    emotion = detect_emotion(img)
    return jsonify({'emocion_detectada': emotion})

if __name__ == '__main__':
    app.run(debug=True)
