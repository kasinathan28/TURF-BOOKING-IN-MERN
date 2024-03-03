import React from 'react'
import "./logo.css"
import logo from "../assets/logo.png"


export default function Logo() {
  return (
    <div>
      <div className='mainLogo'>
      <h1>Amigoose <img src={logo} alt='logo' className='logo'/> </h1>
      </div>
    </div>
  )
}

