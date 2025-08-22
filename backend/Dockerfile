# Usa una imagen de Node.js como base
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Asegura que se instalen las devDependencies
ENV NODE_ENV=development
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que va a correr la aplicación
EXPOSE 3000

# Comando para compilar y ejecutar la aplicación
CMD ["npm", "run", "dev"]