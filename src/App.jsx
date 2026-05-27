import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Add_Product from './components/Add_Product'
import Product_Item from './components/Product_Item'

const App = () => {
  return (
    <>

      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-product' element={<Add_Product/>}/>
        <Route path='/product-item' element={<Product_Item/>}/>
      </Routes>
    </>
  )
}

export default App
