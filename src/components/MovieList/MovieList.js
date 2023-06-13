import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Card from "../card/Card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

 const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=2f0504208b8b68dce9f789c80febfec7&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

   

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()} MOVIES</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Card movie={movie} id={movie.id} key={movie.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList