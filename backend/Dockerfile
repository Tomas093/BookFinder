# Define como se crea la imagen

# Usa una imagen de Node.js como base

FROM node:22.18.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

RUN npx prisma generate

# Expone el puerto en el que va a correr la aplicación
EXPOSE 3000

# Comando para compilar y ejecutar la aplicación
CMD ["npm", "run", "dev"]