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
    "https://the-theater.vercel.app"
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

app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
        const response = await axios.get(url);
        
        const movieData = response.data;

        res.json({
            ...movieData,
            credits: {
                cast: movieData.credits.cast.slice(0, 15),
                crew: movieData.credits.crew.filter(member => 
                    ['Director', 'Producer', 'Screenplay', 'Writer'].includes(member.job)
                )
            }
        });
    } catch (error) {
        console.error(`Error fetching movie details for ${id}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch movie details with credits.' });
    }
});

app.get('/api/movie/:movieId/casts', async (req, res) => {
    const { movieId } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching cast for movie ID ${movieId}:`, error.message);
        res.status(500).json({ error: "Failed to fetch movie cast." });
    }
});

app.get('/api/movie/:movieId/providers', async (req, res) => {
    const { movieId } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching providers for movie ID ${movieId}:`, error.message);
        res.status(500).json({ error: "Failed to fetch movie providers." });
    }
});

app.get('/api/movie/:movieId/videos', async (req, res) => {
    const { movieId } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching videos for movie ID ${movieId}:`, error.message);
        res.status(500).json({ error: "Failed to fetch movie videos." });
    }
});

app.get('/api/genre/movies/:genreId/:page', async (req, res) => {
    const { genreId, page } = req.params;
    
    try {
        const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`;
        const moviesResponse = await axios.get(moviesUrl);
        const movieData = moviesResponse.data;

        const genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`;
        const genreListResponse = await axios.get(genreListUrl);
        const genreListData = genreListResponse.data;

        const genre = genreListData.genres.find(g => g.id === parseInt(genreId));
        const genreName = genre ? genre.name : 'Unknown Genre';

        res.json({
            movies: movieData.results,
            totalPages: movieData.total_pages,
            genreName: genreName,
        });

    } catch (error) {
        console.error(`Error fetching genre movies for ID ${genreId}:`, error.message);
        res.status(500).json({ error: "Failed to fetch genre movies." });
    }
});

app.get('/api/collection/:collectionId', async (req, res) => {
    const { collectionId } = req.params;
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${TMDB_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching collection ${collectionId}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch collection data.' });
    }
});

app.get('/api/person-filmography/:personId', async (req, res) => {
    const { personId } = req.params;
    try {
        const personDetailsUrl = `https://api.themoviedb.org/3/person/${personId}?api_key=${TMDB_API_KEY}`;
        const movieCreditsUrl = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}`;

        const [personRes, movieCreditsRes] = await Promise.all([
            axios.get(personDetailsUrl),
            axios.get(movieCreditsUrl)
        ]);
        
        res.json({
            name: personRes.data.name,
            cast: movieCreditsRes.data.cast,
            crew: movieCreditsRes.data.crew
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch person data.' });
    }
});

app.get('/api/movie/:id/reviews', async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${TMDB_API_KEY}`;
        const response = await axios.get(url);
        
        res.json({
            results: response.data.results.map(review => ({
                id: review.id,
                author: review.author,
                content: review.content,
                rating: review.author_details?.rating
            }))
        });
    } catch (error) {
        console.error(`Error fetching reviews for movie ${id}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});

app.get('/api/movie/:id/images', async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${TMDB_API_KEY}`;
        const response = await axios.get(url);
        
        res.json({
            backdrops: response.data.backdrops
        });
    } catch (error) {
        console.error(`Error fetching images for movie ${id}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch images.' });
    }
});

app.get('/api/movie/:id/recommendations', async (req, res) => {
    const { id } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`;
        const response = await axios.get(url);
        
        res.json({
            results: response.data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date:movie.release_date,
                vote_average: movie.vote_average
            }))
        });
    } catch (error) {
        console.error(`Error fetching recommendations for movie ${id}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch recommendations.' });
    }
});

app.get('/api/search', async (req, res) => {
    const { query, page } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
    }
    
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    query: query,
                    page: page || 1,
                    include_adult: false
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        res.status(500).json({ error: 'Failed to fetch search results.' });
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