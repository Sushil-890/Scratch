// const mongoose = require('mongoose');

// const ratingSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5
//   }
// });

// const movieSchema = new mongoose.Schema({
//   title: String,
//   image: String,
//   ratings: [ratingSchema]
// });

// const MovieModel = mongoose.model('movie', movieSchema);
// module.exports = { MovieModel };
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
  comments: [ // ✅ New field for feedback/comments
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
