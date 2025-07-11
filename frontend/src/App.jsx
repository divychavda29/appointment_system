import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RequireAuth from './components/RequireAuth'  // ✅ NEW

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        {/* ✅ PROTECTED ROUTES */}
        <Route path='/my-profile' element={
          <RequireAuth>
            <MyProfile />
          </RequireAuth>
        } />
        <Route path='/my-appointments' element={
          <RequireAuth>
            <MyAppointments />
          </RequireAuth>
        } />
        <Route path='/appointment/:docId' element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>
        } />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
