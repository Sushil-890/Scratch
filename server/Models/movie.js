
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  release_year: Number,
  genre: [String],
  director: [String],
  cast: [String],
  image: String,
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
    },
  ],
  comments: [ //  New field for feedback/comments
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
});

const MovieModel = mongoose.model("Movie", movieSchema);
module.exports = { MovieModel };
