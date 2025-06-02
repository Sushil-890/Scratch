const { MovieModel } = require("../Models/movie");

const addRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.user._id || req.user.id; // ✅ Use fallback in case _id is missing
    const movieId = req.params.movieId;

    console.log("➕ Add rating request", { movieId, userId, rating });

    const movie = await MovieModel.findById(movieId);
    if (!movie) return res.status(404).json({ message: "❌ Movie not found" });

    const existingRating = movie.ratings.find(
      r => r.userId.toString() === userId.toString()
    );

    if (existingRating) {
      console.log("🔁 Updating existing rating for user:", userId);
      existingRating.rating = rating;
    } else {
      console.log("⭐ Adding new rating from user:", userId);
      movie.ratings.push({ userId, rating });
    }

    await movie.save();
    res.status(200).json({ message: "✅ Rating added/updated", success: true });

  } catch (err) {
    console.error("💥 Error in addRating:", err);
    res.status(500).json({ error: "Something went wrong while saving rating." });
  }
};

const getAverageRating = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ message: "❌ Movie not found" });

    const ratings = movie.ratings.map(r => r.rating);
    let avg = 0;
    if (ratings.length > 0) {
      avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }

    res.status(200).json({ averageRating: avg.toFixed(2) });

  } catch (err) {
    console.error("💥 Error in getAverageRating:", err);
    res.status(500).json({ error: "Failed to fetch average rating." });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error("💥 Error in getAllMovies:", err);
    res.status(500).json({ error: "Failed to fetch movies." });
  }
};
const getOneMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const username = req.user.username;
    const movieId = req.params.movieId;

    const movie = await MovieModel.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.comments.push({ userId, username, text });
    await movie.save();

    res.status(200).json({ message: "Comment added successfully", success: true });
  } catch (err) {
    console.error("Error in addComment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};
const addMovie = async (req, res) => {
  try {
    const { title, release_year, genre, director, cast, image } = req.body;

    const newMovie = new MovieModel({
      title,
      release_year,
      genre,
      director,
      cast,
      image,
      ratings: [],
      comments: []
    });

    await newMovie.save();
    res.status(201).json({ message: "🎉 Movie added successfully!", movie: newMovie });
  } catch (err) {
    console.error("💥 Error in addMovie:", err);
    res.status(500).json({ error: "Failed to add movie" });
  }
};

module.exports = { addRating, getAverageRating, getAllMovies, getOneMovie, addComment, addMovie };
