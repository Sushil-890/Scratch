const express = require('express');
const router = express.Router();
const { addRating, getAverageRating, getAllMovies, getOneMovie, addComment, addMovie } = require('../Controllers/MovieControl');
const { authenticate } = require('../Middleware/AuthMiddleware');

router.get('/movies', getAllMovies);
router.get('/movies/:movieId', getOneMovie); 
router.post('/movies/rate/:movieId', authenticate, addRating); 
router.get('/movies/average/:movieId', getAverageRating);
router.post('/movies/comment/:movieId', authenticate, addComment); 
router.post("/movies/add", authenticate, addMovie);

module.exports = router;
