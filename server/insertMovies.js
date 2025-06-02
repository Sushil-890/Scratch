const { MovieModel } = require('./Models/movie');
const mongoose = require('mongoose');
require('dotenv').config();

const movies = [
    {
      "title": "ARMAGEDDON",
      "release_year": 1998,
      "genre": ["Science Fiction", "Disaster"],
      "director": "Michael Bay",
      "cast": ["Bruce Willis", "Ben Affleck", "Liv Tyler"],
      "image": "https://cdn.kinocheck.com/i/9ir8wpjdwl.jpg"
    },
    {
      "title": "DR. DOOM",
      "release_year": 2026,
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "director": ["Anthony Russo", "Joe Russo"],
      "cast": ["Robert Downey Jr.", "Pedro Pascal", "Chris Hemsworth"],
      "image": "https://th.bing.com/th/id/OIP.d3h6CIHR2ZKor9S0u0hn1AHaLY?rs=1&pid=ImgDetMain"
    },
    {
      "title": "MONSTER HOUSE",
      "release_year": 2006,
      "genre": ["Animated", "Horror", "Comedy"],
      "director": "Gil Kenan",
      "cast": ["Mitchel Musso", "Sam Lerner", "Steve Buscemi"],
      "image": "https://th.bing.com/th/id/OIP.1umjRUVLTbPQCPVU_q1HPgHaK-?rs=1&pid=ImgDetMain"
    },
    {
      "title": "THE LOST CITY",
      "release_year": 2022,
      "genre": ["Action", "Adventure", "Comedy"],
      "director": ["Aaron Nee", "Adam Nee"],
      "cast": ["Sandra Bullock", "Channing Tatum", "Daniel Radcliffe"],
      "image": "https://th.bing.com/th/id/OIP.F8tU9wy_GrFoBLSp19dXFAHaK-?rs=1&pid=ImgDetMain"
    },
    {
      "title": "RAIDERS OF THE LOST ARK",
      "release_year": 1981,
      "genre": ["Adventure", "Action"],
      "director": "Steven Spielberg",
      "cast": ["Harrison Ford", "Karen Allen", "Paul Freeman"],
      "image": "https://th.bing.com/th/id/OIP.mAakEntKHcJPdmIukVEIywHaLQ?rs=1&pid=ImgDetMain"
    },
    {
      "title": "THE DARK KNIGHT",
      "release_year": 2008,
      "genre": ["Action", "Crime", "Thriller"],
      "director": "Christopher Nolan",
      "cast": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      "image": "https://th.bing.com/th/id/OIP.up3Me3dTxRKIg9_h9Kh0YgHaLH?rs=1&pid=ImgDetMain"
    },
    {
      "title": "INCEPTION",
      "release_year": 2010,
      "genre": ["Sci-Fi", "Thriller"],
      "director": "Christopher Nolan",
      "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
      "image": "https://flxt.tmsimg.com/assets/p7825626_p_v8_af.jpg"
    },
    {
      "title": "SPIDERMAN",
      "release_year": 2002,
      "genre": ["Action", "Adventure", "Superhero"],
      "director": "Sam Raimi",
      "cast": ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe"],
      "image": "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/3c31d4bb29b2ae03641a30800bd7c21a041b64876df37f487bdf123423058232._RI_V_TTW_.jpg"
    }
  ];

mongoose.connect(process.env.MONGO_CONN)
    .then(async () => {
        await MovieModel.insertMany(movies);
        console.log("Movies inserted!");
        mongoose.disconnect();
    })
    .catch(err => console.log("Error inserting movies", err));
