import React, { useState, useEffect } from 'react';

const StarRating = ({ movieId }) => {
  const [rating, setRating] = useState(0); // user's selected rating
  const [average, setAverage] = useState(0); // average from backend
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchAverageRating = () => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/average/${movieId}`)
      .then(res => res.json())
      .then(data => {
        setAverage(data.averageRating || 0);
      })
      .catch(err => {
        console.error("Error fetching average rating", err);
        setAverage(0);
      });
  };

  const handleRating = (newRating) => {
    if (!token) {
      setMessage("⚠️ Please login to rate this movie.");
      return;
    }

    setRating(newRating);
    setMessage("Submitting your rating...");

    fetch(`${import.meta.env.VITE_API_URL}/movies/rate/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating: newRating }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Rating Response:", data); // 👈 useful for debugging
        if (data.success) {
          setMessage("✅ Rating submitted successfully!");
          fetchAverageRating();
        } else {
          setMessage("❌ You already rated or something went wrong.");
        }
      })
      .catch(err => {
        console.error("Error submitting rating:", err);
        setMessage("❌ Failed to rate. Try again later.");
      });
  };

  useEffect(() => {
    fetchAverageRating();
  }, []);

  return (
    <div className="mt-2">
      <div className="flex space-x-1 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className={star <= rating ? 'text-yellow-500 text-xl' : 'text-gray-400 text-xl'}
          >
            ★
          </button>
        ))}
      </div>
      <p className="text-sm mt-1">Average Rating: ⭐ {average}</p>
      {message && <p className="text-red-500 text-xs mt-1">{message}</p>}
    </div>
  );
};

export default StarRating;