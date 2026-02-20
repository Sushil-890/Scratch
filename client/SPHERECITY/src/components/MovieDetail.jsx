import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';

const MovieDetail = ({ isLoggedIn, username }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error('Error fetching movie:', err));
  }, [id, refresh]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/movies/comment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: commentText })
      });

      const data = await res.json();
      if (data.success) {
        setCommentText('');
        setRefresh(prev => !prev); // trigger re-fetch
      } else {
        console.error('Failed to post comment:', data.message);
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (!movie) return <div className="p-4">Loading...</div>;

  return (
    <div className="movie-detail-container">
      <img src={movie.image} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p><strong>Release Year:</strong> {movie.release_year}</p>
        <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
        <p><strong>Director:</strong> {movie.director.join(', ')}</p>
        <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>

        <div className="comments-section">
          <h3>Comments:</h3>
          {movie.comments && movie.comments.length > 0 ? (
            <ul>
              {movie.comments.map((comment, index) => (
                <li key={index}><strong>{comment.username}:</strong> {comment.text}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          {isLoggedIn && (
            <div className="comment-box">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
              />
              <button onClick={handleCommentSubmit}>Post Comment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
