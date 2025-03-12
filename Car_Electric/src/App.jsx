
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import HomePageMap from './Pages/HomePageMap'
import Profile from './Pages/Profile'
import MyVehicles from './Pages/MyVehicles'

function App() {

  return (
    <>
    <div>
      <Routes>
          <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
       <Route path="/HomePage" element={<HomePageMap />} />
       <Route path='/Profile' element={<Profile />} />
       <Route path='/MyVehicles' element={<MyVehicles />} />
       </Routes>
      </div>
      
      </>
  )
}

export default App
