import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/NavBar/NavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Update from './pages/Update'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
      <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/updates" element={<Update />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
