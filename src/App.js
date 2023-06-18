import { useState,createContext,useContext,useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import MovieList from './components/MovieList/MovieList';
import Movie from './components/Movie/Movie';
import Footer from './components/Footer/Footer';
import WatchList from './components/watchlist/WatchList';
import { getDbCollection } from './firebase';

export const WatchlistContext= createContext()


function App() {
  const [dark, setDark]= useState(true)
  const [watchlist, setWatchlist]= useState([])
  useEffect(() => {
    getDbCollection(setWatchlist)
}, [])
  return (
    <WatchlistContext.Provider value={{watchlist,setWatchlist}}>
    <div className="App" style={{backgroundColor: dark? "#1f456e": "#c5c6d0", color: dark? "#EAE7DC": "#1A1A1D"}}>
 
      
      <Router>
      <Header dark={dark} setDark={setDark}/>
        <Routes>
        
          <Route exact path="/" element={<Home dark={dark}/>}></Route>
          <Route exact path="/movie/:id" element={<Movie dark={dark}/>}></Route>
          <Route exact path="/movies/:type" element={<MovieList/>}></Route>
          <Route exact path="/watchlist" element={<WatchList/>}></Route>
          <Route exact path="/*" element={<img src="https://rare-gallery.com/uploads/posts/374547-4k-wallpaper.jpg" style={{width:"100%",maxHeight:"500px",objectFit:"cover"}}></img>}></Route>
        </Routes>
        <Footer dark={dark}/>
      </Router>
    </div>
    </WatchlistContext.Provider>
  );
}

export default App;
