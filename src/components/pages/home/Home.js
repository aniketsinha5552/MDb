import React, { useEffect, useState } from 'react';

import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import MovieList from '../../MovieList/MovieList';


// popular api= "https://api.themoviedb.org/3/movie/popular?api_key=2f0504208b8b68dce9f789c80febfec7&language=en-US&page=1"
// top rated = "https://api.themoviedb.org/3/movie/top_rated?api_key=2f0504208b8b68dce9f789c80febfec7&language=en-US&page=1"
// upcoming= "https://api.themoviedb.org/3/movie/upcoming?api_key=2f0504208b8b68dce9f789c80febfec7&language=en-US&page=1"
export default function Home({dark}) {
    const [popularMovies, setPopularMovies] = useState([])
    useEffect(()=>{
       fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f0504208b8b68dce9f789c80febfec7&language=en-US&page=1")
       .then(res=>res.json())
       .then(data=>{
        setPopularMovies(data.results)
        console.log(data.results)
    })
    },[])
  return (
    <>
        <div className='poster' >
         
           <Carousel
            // Resposponsive carousel props 
              showThumbs={false}
              autoPlay={true}
              transitionTime={3}
              infiniteLoop={true}
              showStatus={false}
            >
               {popularMovies.map((movie)=>{
                  return(
                    <Link style={{textDecoration:"none",color: dark? "#EAE7DC": "black"}} to={`/movie/${movie.id}`} key={movie.id}>
                    <div id="carousel">
                        <img id="posterImage" src={movie && `https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""></img>
                        <div id="movieDetails">
                        <h1 id="movieTitle">{movie && movie.original_title}</h1>
                        <span>{movie && movie.release_date} <span>{movie && movie.vote_average}<StarIcon style={{marginBottom:"-4px",color:"gold"}}/></span></span>
                        <p id="desc">{movie && movie.overview}</p>
                        </div>    
                    </div>
                    </Link>
                    
                  )
               })}
            </Carousel>
            <MovieList/>
           
        </div>
    </>
  )
}
