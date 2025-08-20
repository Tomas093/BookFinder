# Etapa 1: Construcción de la aplicación
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y las dependencias
COPY package*.json ./

# Instala las dependencias y construye la aplicación
RUN npm install
COPY . .
RUN npm run build
