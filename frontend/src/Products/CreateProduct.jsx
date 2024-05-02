import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


export default function CreateProduct() {

const navigator = useNavigate();

const [nombre, setNombre] =  useState('');
const [precio, setPrecio] = useState(0);

const handleSubmit = async(event) => {
    event.preventDefault();

    const body = {
        nombre: nombre,
        precio: precio
    }

    try {
        var data = await axios.post('http://127.0.0.1:5000/productos', body);

        Swal.fire({
            title: 'Exito!',
            text: 'Se ha creado el producto',
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
            text: 'Error al crear el producto',
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
