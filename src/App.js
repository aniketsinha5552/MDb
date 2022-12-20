import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import MovieList from './components/MovieList/MovieList';
import Movie from './components/Movie/Movie';
import Footer from './components/Footer/Footer';

function App() {
  const [dark, setDark]= useState(true)
  //#5F9EA0 blue
  //#EAE7DC white
  return (
    <div className="App" style={{backgroundColor: dark? "#1A1A1D": "#EAE7DC", color: dark? "#EAE7DC": "#1A1A1D"}}>
 
      
      <Router>
      <Header dark={dark} setDark={setDark}/>
        <Routes>
        
          <Route exact path="/" element={<Home dark={dark}/>}></Route>
          <Route exact path="/movie/:id" element={<Movie dark={dark}/>}></Route>
          <Route exact path="/movies/:type" element={<MovieList/>}></Route>
          <Route exact path="/*" element={<img src="https://rare-gallery.com/uploads/posts/374547-4k-wallpaper.jpg" style={{width:"100%",maxHeight:"500px",objectFit:"cover"}}></img>}></Route>
        </Routes>
        <Footer dark={dark}/>
      </Router>
    </div>
  );
}

export default App;
