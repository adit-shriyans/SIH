import React from 'react'
import "./Navbar.css";
import logo from "./assets/logoNew.png"
const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className="teamLogo">
            <img src={logo} className="logoImg" />
            <h1 className='title teamTitle' id='teamTitle'>AyurDevs</h1> 
        </div>
        <h1 id="ProjectTitle"className="title">Prakriti App</h1>
    </div>
  )
}

export default Navbar