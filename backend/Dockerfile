# Usar la imagen oficial de Python como base
FROM python:3.9

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo de requisitos al directorio de trabajo
COPY requirements.txt .

# Instalar los requisitos
RUN pip install -r requirements.txt

# Copiar el código de la aplicación al directorio de trabajo
COPY app.py .

# Exponer el puerto 5000 en el contenedor
EXPOSE 5000

# Comando para ejecutar la aplicación Flask
CMD ["python", "app.py"]
