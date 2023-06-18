import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Card from "../card/Card"

const renderListName = (type) => {
    switch(type) {
        case "popular":
            return "POPULAR"
        case "top_rated":
            return "TOP RATED"
        case "upcoming":
            return "UPCOMING"
        case "now_playing":
            return "NOW PLAYING"
        default:
            return "POPULAR"
    }
}

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

 const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    useEffect(() => {
             setMovieList([])
            getData() 
    }, [type])

   

    return (
        <div className="movie__list">
            <h2 className="list__title">{renderListName(type)} MOVIES</h2>
            <div className="list__cards">
                {
                    movieList.map((movie,idx) => (
                        <Card movie={movie} id={movie.id} key={idx} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList