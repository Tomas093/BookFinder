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

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos de la aplicación construida
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 del servidor Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]