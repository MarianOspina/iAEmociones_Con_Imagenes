# iAEmociones_Con_Imagenes

1. Creamos un entorno virtual de Python para la instalación de dependencias siguiendo los comandos:
- Ejecutamos en nuestra terminal `pip install virtualenv`.
- Creamos el entorno virtual en la terminal `python -m virtualenv reconocimiento_emociones`.
- Iniciamos el entorno virtual `reconocimiento_emociones\Scripts\activate`, en el caso de MacOS usamos `source reconocimiento_emociones/bin/activate`.

2. Con el entorno virtual, procedemos a instalar las dependencias correspondientes en el `requirements.txt` usando este comando en la terminal: `pip install -r requirements.txt`

3. Una vez que se hayan instalado las librerías necesarias en el proyecto, ejecutaremos el proyecto con el siguiente comando: `uvicorn main:app --port 8000 --reload`.

4. Con el servidor de uvicorn iniciado, iremos a la URL: `http://127.0.0.1:8000`.