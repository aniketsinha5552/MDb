import React from 'react'
import "./Footer.css"
import { Icon } from '@iconify/react';

export default function Footer({dark}) {

  return (
    <div id="footer" style={{backgroundColor: dark? "#c5c6d0": "#1f456e",color: dark? "#1A1A1D": "#EAE7DC"}} >
      <p className='copyright'>&#169; aniketsinha5552@gmail.com</p>
      <div className='footer-logos'>
         <a href="https://github.com/aniketsinha5552" style={{textDecoration:"none"}}><Icon style={{fontSize:"30px",margin:"2px",color: dark? "#1A1A1D": "#EAE7DC"}} icon="mdi:github" /></a>
         <a href="https://www.linkedin.com/in/aniket-sinha-a2ab29241/" style={{textDecoration:"none"}}><Icon style={{fontSize:"30px",margin:"2px",color: dark? "#1A1A1D": "#EAE7DC"}} icon="mdi:linkedin" /></a>
      </div>
    </div>
  )
}
