import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const ListProducts = () => {

  const navigator = useNavigate();

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts(){
    axios.get('http://127.0.0.1:5000/productos') // Reemplaza esto con la URL real de tu servicio de productos
      .then(response => setProductos(response.data.productos))
      .catch(error => console.error('Error fetching productos:', error));
  }

  function handleEdit  (id){
    navigator(`/editar/${id}`);
  }

  async function handleDelete(id){
    Swal.fire({
      title: "Está seguro?",
      text: "Esto no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:5000/productos/${id}`);
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido borrado exitosamente",
          icon: "success"
        });

        getProducts();
      }
    });
  }

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      <a href='/crear'> <button className='btn btn-success'>Crear</button> </a> 
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
              <td><button onClick={()=> handleEdit(producto._id)} className='btn btn-success'>Editar</button></td>
              <td><button onClick={()=> handleDelete(producto._id)} className='btn btn-danger'>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
