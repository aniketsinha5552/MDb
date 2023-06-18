import React, { useEffect, useState,useContext } from "react";
import "./Movie.css";
import { useParams } from "react-router-dom";
import { Icon } from '@iconify/react';
import { addDbItem,getDbCollection } from "../../firebase";
import { WatchlistContext} from "../../App";

const Movie = ({ dark }) => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();
  const {watchlist,setWatchlist} = useContext(WatchlistContext)

  useEffect(() => {
    setMovie(null);
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const addToWatchlist = () => {
    const id = currentMovieDetail.id
    const search = watchlist.find((item) => item.movie_id == id)
    if(search){
        alert("⚠️! Already in watchlist")
        return
    }
    else{
        addDbItem(currentMovieDetail)
        getDbCollection(setWatchlist)
        alert("✅! Added to watchlist")
    }
    
}

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail
                ? Math.round(currentMovieDetail.vote_average * 10) / 10
                : ""}{" "}
              <Icon icon="iconamoon:star-bold" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              Runtime: {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre, idx) => (
                    <span key={idx}>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            <button onClick={addToWatchlist} className="watchlistAdd"><Icon icon="ooui:watchlist-ltr" style={{ color: "white" }} />{" "}Add to watchlist</button>
          </div>
        </div>
      </div>
        <div className="movie__heading">Useful Links</div>
      <div className="movie__links">
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="production__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company, idx) => (
            <div key={idx}>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movie;
