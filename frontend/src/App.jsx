import './App.css'
import CreateProduct from './Products/CreateProduct'
import EditProduct from './Products/EditProduct'
import ListProducts from './Products/ListProducts'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {


  return (
  <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={ListProducts}/>
        <Route path='/crear' Component={CreateProduct}/>
        <Route path='/editar/:id' Component={EditProduct}/>
      </Routes>
  </BrowserRouter>
  )
}

export default App
