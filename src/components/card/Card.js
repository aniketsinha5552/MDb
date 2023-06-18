import React, {useEffect, useState,useContext} from "react"
import "./Card.css"
import { Link, useNavigate } from "react-router-dom"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton,Alert,AlertTitle } from "@mui/material";
import { Icon } from '@iconify/react';
import { addDbItem,getDbCollection } from "../../firebase";
import { WatchlistContext } from "../../App";

const Card = ({movie}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const {watchlist,setWatchlist} = useContext(WatchlistContext)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 


    const addToWatchlist = () => {
        const id = movie.id
        const search = watchlist.find((item) => item.movie_id == id)
        console.log("search",search,movie,watchlist)
        if(search){
            alert("⚠️! Already in watchlist ")
            return
        }
        else{
            addDbItem(movie)
            getDbCollection(setWatchlist)
            alert("✅! Added to watchlist")
        }
        
    }

    return <>
    {
        isLoading
        ?
        <div className="cards" style={{display:"grid",placeItems:"center"}}>
          <Icon style={{fontSize:"40px"}} icon="line-md:loading-twotone-loop" />
        </div>
        :
            <div className="cards">        
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} alt="" onLoad={()=>setIsLoading(false)}/>
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<StarBorderIcon style={{marginBottom:"-6px", marginTop:"-5px", color:"gold"}}/></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                <button className='know-more' onClick={()=>navigate(`/movie/${movie.id}`)}>Know More</button>
                <button title="Add to watchlist" onClick={addToWatchlist} id="watch-btn"><Icon icon="ooui:watchlist-ltr" style={{ color: "white" }} /></button>
                </div>
            </div>
    }
    </>
}

export default Card