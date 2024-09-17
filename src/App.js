import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Landing from './Component/Landing'

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/Signup' element={<Signup />}></Route>
      <Route path='/Landing' element={<Landing />}></Route>
     </Routes>
     </BrowserRouter> 
    </div>
  )
}

export default App
