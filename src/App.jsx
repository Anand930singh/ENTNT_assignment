import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Authentication from './pages/Authentication'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from './pages/Home'
import Users from './data/users.json'
import Cookies from 'js-cookie';

function App() {
  const seedShipsData = Users.ships; 
  const seedComponentsData = Users.components; 
  const seedJobsData = Users.jobs; 

  useEffect(()=>{
    Cookies.set("ships", JSON.stringify(seedShipsData));
    Cookies.set("components", JSON.stringify(seedComponentsData));
    Cookies.set("jobs", JSON.stringify(seedJobsData));
  })

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
