import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function EditProduct() {

  const {id} = useParams();

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
            setNombre(response.data.nombre)
            setPrecio(response.data.precio)
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    };

    fetchData();
}, [id]);


  const handleSubmit = async(event) => {
    event.preventDefault();

    const body = {
        nombre: nombre,
        precio: precio
    }

    try {
        var data = await axios.put(`http://127.0.0.1:5000/productos/${id}`, body);

        Swal.fire({
            title: 'Exito!',
            text: 'Se ha modificado el producto',
            icon: 'success',
            confirmButtonText: 'Cool'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/";
            }
        });
        

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Error al modificar el producto',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }
    
}



return (
  <div className='container'>
      <div className='row justify-content-center'>
          <div className="col-sm-5">
              <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                      <label htmlFor='nombre' className='form-label'>Nombre:</label>
                      <input type='text' className='form-control' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                  </div>

                  <div className='mb-3'>
                      <label htmlFor='precio' className='form-label'>Precio:</label>
                      <input type='number' className='form-control' id='precio' value={precio} onChange={(e) => setPrecio(e.target.value)}/>
                  </div>

                  <button type='submit' className='btn btn-primary'>Guardar</button>
              </form>
          </div>
      </div>

  </div>
)

}