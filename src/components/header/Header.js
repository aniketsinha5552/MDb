import React,{useEffect, useState} from 'react'
import './Header.css'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate,Link } from 'react-router-dom';
import logo from '../images/logo.png'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import { Icon } from '@iconify/react';
import { Autocomplete,TextField,ListItem } from '@mui/material';


const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value)
	useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedValue(value)
		}, delay);
		return () => {
			clearTimeout(id);
		}
	}, [value, delay]);

	return debouncedValue;
}

export default function Header({dark,setDark}) {
    function changeTheme(){
        setDark(prev=>!prev)
      }
      const navigate= useNavigate()
      const [options, setOptions] = useState([]);
      const [searchValue, setSearchValue] = useState([]);

      const debouncedValue = useDebounce(searchValue, 750);

      const handleSearchChange = (event, value) => {
        setSearchValue(value);
      }

      const getSearchOptions = async(searchValue) => {
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2f0504208b8b68dce9f789c80febfec7&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        let data = await res.json();
        console.log(data.results);
        setOptions(data.results);
      }

      useEffect(() => {
        getSearchOptions(debouncedValue);
      }, [debouncedValue]);

      const RenderOption = (movie) => {
        const navigateToDetails = () => {
          navigate(`/movie/${movie.id}`)
        }
        return (
          <div className="searchOption" onClick={navigateToDetails}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
            <div className="searchOption__details">
              <h3 style={{fontSize:"12px"}}>{movie.original_title}</h3>
              <p style={{fontSize:"10px"}}>{movie.release_date}</p>
            </div>
          </div>
        )
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
        <div style={{display:"flex",flexDirection:"row",height:"30px",marginTop:"20px"}}>
        <Autocomplete
        onInputChange={handleSearchChange}
        id="free-solo-demo"
        freeSolo
        options={options}
        filterOptions={(options, state) => options}
        getOptionLabel={(option) => (option.original_title)}
        renderOption={(props, option) => (
          <ListItem {...props} sx={{width:"100%"}}>
            <RenderOption {...option}/>
          </ListItem>
          )}
        renderInput={(params) => <TextField {...params} label={<Icon icon="material-symbols:search" color={dark? "white" : "black"}/>} />}
        size='small'
        sx={{width:"250px",height:"30px",paddingLeft:"10px",height:"30px",input: {color: dark? "#EAE7DC": "#1A1A1D" }}}
      />
        {/* <button style={{height:"40px",width:"40px",borderRadius:"4px",border:"1px solid gray",marginLeft:"1px"}}><Icon icon="material-symbols:search" /></button> */}
        </div>
        <button  onClick={changeTheme} style={{backgroundColor:dark? "#1A1A1D": "#EAE7DC",marginTop:"20px",padding:"3px"}}>
        {dark? <DarkModeIcon style={{color:"#29648A"}}/>: <LightModeIcon style={{color:"#29648A"}}/>}
      </button>
    </div>
  )
}
