import React from 'react';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
const MovieList = ({ movies }) => {
  return (
    <div className="card-container">
      {movies.map((movie) => (
        <div key={movie._id} className="card">
          {/* <img src={movie.image} alt={movie.title} /> */}
          <Link to={`/movie/${movie._id}`}>
            <img src={movie.image} alt={movie.title} className="cursor-pointer" />
          </Link>
          <h2>{movie.title}</h2>
          <StarRating movieId={movie._id} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
