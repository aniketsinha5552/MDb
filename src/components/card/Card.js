import React, {useEffect, useState} from "react"
import "./Card.css"
import { Link } from "react-router-dom"
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Card = ({movie}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

    return <>
    {
        isLoading
        ?
        <div className="cards">
          <img style={{width:"200px",height:"300px",objectFit:"cover"}} src="https://wallpaperaccess.com/full/3897424.jpg" alt="" />
        </div>
        :
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} alt="" />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<StarBorderIcon style={{marginBottom:"-6px", marginTop:"-5px", color:"gold"}}/></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Card