import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './pages/Authentication'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from './pages/Home'
import Users from './data/users.json'
import { useDispatch } from 'react-redux'
import { setShips } from './slice/shipSlice'
import { setComponents } from './slice/componentSlice'
import { setJobs } from './slice/jobSlice'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'

function App() {
  const dispatch = useDispatch();

   useEffect(() => {
    if (!localStorage.getItem('ships')) {
      dispatch(setShips(Users.ships));
    }
    if (!localStorage.getItem('components')) {
      dispatch(setComponents(Users.components));
    }
    if (!localStorage.getItem('jobs')) {
      dispatch(setJobs(Users.jobs));
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
