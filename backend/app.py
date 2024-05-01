from flask import Flask, jsonify , request, abort
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS


# Crear una instancia de la aplicación Flask
app = Flask(__name__)
CORS(app) 
app.config["MONGO_URI"] = "mongodb+srv://gregorysalazar:ga5YPlGoEAJDYiw7@cluster0.j67jvkq.mongodb.net/test"
mongo = PyMongo(app)

# Ruta para obtener un producto por su ID



@app.route('/products/<string:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        # Verificar si el ID del producto es válido (por ejemplo, longitud, formato)
        
        if len(product_id) != 24 or not ObjectId.is_valid(product_id):
            return jsonify({'message': 'Invalid product ID'}), 400
        
        # Consultar el producto en la base de datos
        product = mongo.db.productos.find_one({'_id': ObjectId("66319ebfbf76035ead2f1f73")})
        
        
        if product:
            # Convertir ObjectId a cadena en el documento del producto
            product['_id'] = str(product['_id'])
            
            # Producto encontrado, devolverlo como JSON
            return jsonify(product), 200
        else:
            # Producto no encontrado, devolver un mensaje de error
            return jsonify({'message': 'Product not found'}), 404
    except Exception as e:
        # Capturar cualquier excepción y devolver un mensaje de error genérico
        print("Error:", e)
        return jsonify({'message': 'Internal server error'}), 500


# Ruta para crear un nuevo producto
@app.route('/productos', methods=['POST'])
def create_product():
    try:
        nombre = request.json['nombre']
        precio = request.json['precio']
        
        producto_id = mongo.db.productos.insert_one({
            "nombre": nombre,
            "precio": precio
        }).inserted_id
        
        return jsonify(str(producto_id)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ruta para obtener todos los productos
@app.route('/productos', methods=['GET'])
def get_products():
    try:
        productos = mongo.db.productos.find()
        output = []
        for producto in productos:
            output.append({
                'nombre': producto['nombre'],
                'precio': producto['precio']
            })
        return jsonify({'productos': output}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400





# Ruta para actualizar un producto por su ID
@app.route('/productos/<string:producto_id>', methods=['PUT'])
def update_product(producto_id):
    try:
        nombre = request.json['nombre']
        precio = request.json['precio']
        
        mongo.db.productos.update_one(
            {"_id": ObjectId(producto_id)},
            {"$set": {
                "nombre": nombre,
                "precio": precio
            }}
        )
        
        return jsonify({"message": "Producto actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ruta para eliminar un producto por su ID
@app.route('/productos/<string:producto_id>', methods=['DELETE'])
def delete_product(producto_id):
    try:
        mongo.db.productos.delete_one({"_id": ObjectId(producto_id)})
        return jsonify({"message": "Producto eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    

def create_product_collection():
    try:
        # Obtén una referencia a la base de datos
        db = mongo.db

        # Crea una nueva colección llamada "productos" con un documento de ejemplo
        db.productos.insert_one({
            "nombre": "Producto 1",
            "precio": 10.99
        })

        return 'Colección "productos" creada exitosamente'
    except Exception as e:
        return str(e)
    

# Definir una ruta para el endpoint que devuelve "Hola Mundo"
@app.route('/')
def hello_world():
    return '¡Hellow!'

# Punto de entrada del script
if __name__ == '__main__':
    #create_product_collection()
    # Ejecutar la aplicación en modo de desarrollo en el puerto 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
