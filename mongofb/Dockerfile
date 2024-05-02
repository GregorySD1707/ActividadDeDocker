# Usa una imagen base de MongoDB
FROM mongo

# Copia el archivo de configuración personalizado con la autenticación habilitada
COPY mongod.conf /etc/mongod.conf

# Expone el puerto en el que MongoDB escucha por defecto (27017)
EXPOSE 27017

# Define variables de entorno para el nombre de usuario y contraseña
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin

# Ejecuta el servidor MongoDB con autenticación cuando se inicie el contenedor
CMD ["mongod", "--config", "/etc/mongod.conf"]
