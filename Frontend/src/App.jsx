import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import RoomDetail from './pages/RoomDetail'
import Dashboard from './pages/Dashboard'

function App() {
  

  return (
    <>
     
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/rooms/:id' element={<RoomDetail/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <div>
        
      </div>
    </>
  )
}

export default App
