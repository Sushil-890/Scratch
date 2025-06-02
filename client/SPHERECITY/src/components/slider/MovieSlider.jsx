import React, { useState } from "react";
import "./Slider.css";

const MovieSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (movies.length === 0) return <h1>Loading movies...</h1>;


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="slider-btn left">⬅️</button>
        {movies.length > 0 && (
          <div className="slider-slide">
            <div className="slider-overlay">
              <h3>{movies[currentIndex].title}</h3>
              <p>{movies[currentIndex].genre.join(", ")}</p>
            </div>
            <img src={movies[currentIndex].image} alt={movies[currentIndex].title} />
          </div>
        )}
      <button onClick={nextSlide} className="slider-btn right">➡️</button>
    </div>
  );
};

export default MovieSlider;
