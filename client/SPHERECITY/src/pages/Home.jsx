import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import '../App.css'
import MovieSlider from '../components/slider/MovieSlider';
// const Home = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/movies')
//       .then(res => res.json())
//       .then(data => setMovies(data))
//       .catch(err => console.error('Fetch error:', err));
//   }, []);

//   return (
//     <div className="p-4">
//       <MovieList movies={movies} />
//     </div>
//   );
// };
const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://scratch-server.onrender.com/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (movies.length === 0) return <h1>Loading....</h1>;

  return (
    <div className="home">
      
    <div className="ban-bag">
      <MovieSlider movies={filteredMovies} />
      <section className="banner">
        <h1>Welcome to SphereCity</h1>
        <p>Your ultimate destination for Movies and Entertainment.</p>
      </section>
    </div>
    <div className="p-4">
      <MovieList movies={filteredMovies} />
    </div>
    </div>
  );
};

export default Home;
