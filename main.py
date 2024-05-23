from typing import Union
from fastapi import FastAPI
import tensorflow as tf
import tensorflow_hub as hub
from tensorflow.keras.models import load_model
from PIL import Image
import requests
from io import BytesIO
import cv2
from fastapi import FastAPI, UploadFile, File
import numpy as np



app = FastAPI()

with tf.keras.utils.custom_object_scope({'KerasLayer': hub.KerasLayer}):
    modelo_cargado = load_model('modelo_entrenado.h5')

def predecir_emocion(img):
    img = np.array(img).astype(float)/255
    img = cv2.resize(img, (224,224))
    prediccion = modelo_cargado.predict(img.reshape(-1, 224, 224, 3))
    emocion = np.argmax(prediccion[0], axis=-1)
    return emocion



@app.post("/predict/")
async def predecir_emocion(file: UploadFile = File(...)):
    contenido = await file.read()
    emocion = predecir_emocion(contenido)
    return {"emocion": emocion}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
