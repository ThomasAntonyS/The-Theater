import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import MovieCard from '../Components/MovieCard';
import Footer from '../Components/Footer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  document.title = "The Theater | Home";
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();

  // Fetch trending movies for an interactive hero highlight or feature row
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/movies/trending/page/1`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setTrendingMovies(data.results.slice(0, 5));
          fetchTrailer(data.results[0].id);
        }
      } catch (err) {
        console.error("Error fetching trending spotlight:", err);
      }
    };
    fetchTrending();
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/videos`);
      const data = await res.json();
      const trailer = data.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
      setTrailerKey(trailer ? trailer.key : (data.results?.[0]?.key || null));
    } catch (err) {
      setTrailerKey(null);
    }
  };

  const handleMovieSelect = (index, movie) => {
    setSelectedMovieIndex(index);
    fetchTrailer(movie.id);
  };

  const activeMovie = trendingMovies[selectedMovieIndex];

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Header />
      <Banner />

      {/* INTERACTIVE TRENDING SPOTLIGHT / VIDEO TRAILER SECTION */}
      {activeMovie && (
        <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 my-12">
          <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
            <div className="w-1 h-8 md:h-10 bg-red-600 rounded-full" />
            <h2 className="text-3xl md:text-5xl text-white font-manrope font-black italic tracking-tighter uppercase">
              Trending Spotlight
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            
            {/* Background glow overlay */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Video / Backdrop Preview Player */}
            <div className="lg:col-span-2 w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
              {trailerKey ? (
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&mute=1&controls=1&modestbranding=1`}
                  title={activeMovie.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeMovie.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`}
                  alt={activeMovie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700">No Preview Available</div>
              )}
            </div>

            {/* Interactive Info & Quick Switcher */}
            <div className="flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-manrope font-black tracking-widest text-red-600 uppercase">
                  <span>{activeMovie.release_date?.split("-")[0]}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <StarIcon sx={{ fontSize: 14 }} /> {activeMovie.vote_average?.toFixed(1)}
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-manrope font-black italic uppercase tracking-tight text-white leading-tight">
                  {activeMovie.title}
                </h3>
                <p className="text-white/70 font-nunito text-sm line-clamp-3 leading-relaxed">
                  {activeMovie.overview}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    navigate(`/movie/${activeMovie.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-manrope font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-red-600/30"
                >
                  <PlayArrowIcon /> Watch Details & Trailers
                </button>

                {/* Thumbnail switcher row */}
                <div className="grid grid-cols-5 gap-2 pt-2">
                  {trendingMovies.map((mov, idx) => (
                    <button
                      key={mov.id}
                      onClick={() => handleMovieSelect(idx, mov)}
                      className={`relative rounded-lg overflow-hidden aspect-[2/3] border-2 transition-all ${
                        selectedMovieIndex === idx ? 'border-red-600 scale-105 shadow-md shadow-red-600/50' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200${mov.poster_path}`}
                        alt={mov.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* EXISTING MOVIE ROWS */}
      <section>
        <MovieCard 
          title={"Popular Movies"} 
          url={`${import.meta.env.VITE_API_BASE}/api/movies/popular/page/1`}
          navLink={'popular/page/1'}
        />
      </section>

      <MovieCard 
        title={"Upcoming"} 
        url={`${import.meta.env.VITE_API_BASE}/api/movies/upcoming/page/1`}
        navLink={'upcoming/page/1'}
      />

      <MovieCard 
        title={"Top Rated"} 
        url={`${import.meta.env.VITE_API_BASE}/api/movies/top_rated/page/1`}
        navLink={'top_rated/page/1'}
      />

      <Footer />
    </div>
  );
};

export default Home;