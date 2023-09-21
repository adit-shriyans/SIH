import React from 'react'
import "./Navbar.css";
import logo from "./assets/logoNew.png"
const Navbar = () => {
  return (
    <div className='Navbar'>
        <img src={logo} className="logoImg" />
        <h1 className="title">Prakriti App</h1>
    </div>
  )
}

export default Navbar