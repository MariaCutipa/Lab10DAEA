# Usar la imagen base de Node.js
FROM node:18

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar el archivo de la aplicación al contenedor
COPY server.js .

# Instalar dependencias
RUN npm install mssql

# Exponer el puerto 3000
EXPOSE 3000

# Ejecutar la aplicación Node.js
CMD ["node", "server.js"]
