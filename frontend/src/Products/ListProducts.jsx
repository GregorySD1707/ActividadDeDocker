import  { useState, useEffect } from 'react';
import axios from 'axios';

const ListProducts = () => {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/productos') // Reemplaza esto con la URL real de tu servicio de productos
      .then(response => setProductos(response.data.productos))
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      <button className='btn btn-success'>Crear</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Editar</th>
            <th>ELiminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto._id}>
              <td>{producto._id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td><button className='btn btn-success'>Editar</button></td>
              <td><button className='btn btn-danger'>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
