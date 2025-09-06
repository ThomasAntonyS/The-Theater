require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const allowedOrigins =[
    "http://localhost:5173",
    "http://the-theater.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error("CORS policy does not allow this origin"), false);
      }
  },
  credentials: true
}));

const TMDB_API_KEY = process.env.TMDB_API_KEY; 

app.get('/api/movies/popular', async (req, res) => { 
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies." });
  }
});

app.get('/api/movies/upcoming', async (req, res) => {   
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error.message);
    res.status(500).json({ error: "Failed to fetch upcoming movies." });
  }
});

app.get('/api/movies/top-rated', async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated movies." });
  }
});

app.get('/api/movies/trending', async (req, res) => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&include_adult=false`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching trending movies:", error.message);
        res.status(500).json({ error: "Failed to fetch trending movies." });
    }
});

app.get('/api/movies/popular/page/:page_no', async (req, res) => {
    const { page_no } = req.params;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page_no}&include_adult=false`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching popular movies:", error.message);
        res.status(500).json({ error: "Failed to fetch popular movies." });
    }
});

app.get('/api/movies/top_rated/page/:page_no', async (req, res) => {
    const { page_no } = req.params;
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page_no}&include_adult=false`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching top-rated movies:", error.message);
        res.status(500).json({ error: "Failed to fetch top-rated movies." });
    }
});

app.get('/api/movies/upcoming/page/:page_no', async (req, res) => {
    const { page_no } = req.params;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page_no}&include_adult=false`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching upcoming movies:", error.message);
        res.status(500).json({ error: "Failed to fetch upcoming movies." });
    }
});

app.get('/api/movies/trending/page/:page_no', async (req, res) => {
    const { page_no } = req.params;
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=${page_no}&include_adult=false`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching trending movies:", error.message);
        res.status(500).json({ error: "Failed to fetch trending movies." });
    }
});

app.get("/", async (req, res) => {
  res.send("Welcome to the theater backend.")
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app