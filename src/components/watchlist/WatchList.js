import React,{useContext,useState,useEffect} from 'react'
import "./WatchList.css";
import { WatchlistContext } from '../../App';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link, useNavigate } from "react-router-dom"
import { Icon } from '@iconify/react';
import { db,WatchlistDb,getDbCollection,deleteDbItem } from "../../firebase";

export default function WatchList() {
  
  const navigate = useNavigate()
  const {watchlist,setWatchlist} = useContext(WatchlistContext)


  const delFromWatchlist=(delMov)=>{
    console.log(delMov)
    deleteDbItem(delMov)
    getDbCollection(setWatchlist)
  }

 const navigateToDetails = (movie) => {
    console.log(movie)
    navigate(`/movie/${movie?.movie_id}`);
 }
  
  return (
    <div className='movie__list'>
      <h2 className='list__title'>MY WATCHLIST</h2>
      <div className='list__cards'>
        {watchlist.map((movie)=>{
            return(
                <div className="cards" key={movie.id}>        
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} alt="" loading="lazy"/>
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?Math.round(movie.vote_average*10)/10:""}<StarBorderIcon style={{marginBottom:"-6px", marginTop:"-5px", color:"gold"}}/></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                <button className='know-more' onClick={()=>navigateToDetails(movie)}>Know More</button>
                <button onClick={()=>delFromWatchlist(movie.id)} id="watch-btn"><Icon icon="ic:baseline-delete" style={{color:"white"}} /></button>
                </div>
            </div>
            )
        })}
        </div>
    </div>
  )
}
