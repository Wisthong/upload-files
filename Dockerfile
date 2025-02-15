# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de tu proyecto al contenedor
COPY package*.json ./
COPY public ./public
COPY app.js ./
COPY bot.py ./

# Actualizar los repositorios e instalar las dependencias necesarias
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-tk \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1

# Crear un entorno virtual para Python
RUN python3 -m venv /usr/src/app/venv

# Activar el entorno virtual e instalar las dependencias de Python
RUN /usr/src/app/venv/bin/pip install pyautogui

# Instalar las dependencias de la aplicación Node.js
RUN npm install

# Exponer el puerto 3000 en el contenedor
EXPOSE 3000

# Ejecutar el servidor de Node.js cuando el contenedor se inicie
CMD ["node", "app.js"]
