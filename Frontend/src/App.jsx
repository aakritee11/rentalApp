import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
     
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
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
