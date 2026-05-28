import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
     
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <div>
        <h2>
          RentalApp
        </h2>
      </div>
    </>
  )
}

export default App
