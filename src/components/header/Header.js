import React from 'react'
import './Header.css'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UpcomingIcon from '@mui/icons-material/Upcoming';

export default function Header({dark,setDark}) {
    function changeTheme(){
        setDark(prev=>!prev)
      }
  return (
    <div className='header'>
        <div id="headerLeft">
            <Link to="/" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><img src={logo}></img></Link>
            <Link to="/movies/popular" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><p>Pouplar</p></Link>
            <Link to="/movies/upcoming" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><p>Upcoming</p></Link>
            <Link to="/movies/top_rated" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><p>Top Rated</p></Link>
            <div id="dropDown">
            <Link to="/movies/popular" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><WhatshotIcon style={{marginLeft:"10px",marginRight:"10px"}}/></Link>
            <Link to="/movies/upcoming" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><StarBorderIcon style={{marginLeft:"10px",marginRight:"10px"}}/></Link>
            <Link to="/movies/top_rated" style={{textDecoration:"none", color: dark? "#EAE7DC": "#1A1A1D"}}><UpcomingIcon style={{marginLeft:"10px",marginRight:"10px"}}/></Link>
              
              
              
            </div>
            
        </div>
        <button  onClick={changeTheme} style={{backgroundColor:dark? "#1A1A1D": "#EAE7DC"}}>
        {dark? <DarkModeIcon style={{color:"#29648A"}}/>: <LightModeIcon style={{color:"#29648A"}}/>}
      </button>
    </div>
  )
}
