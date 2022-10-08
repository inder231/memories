import React from 'react'
import {Routes,Route} from "react-router-dom"
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
const Allroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
    </Routes>
  )
}

export default Allroutes