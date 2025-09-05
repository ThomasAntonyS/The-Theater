import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Tailspin } from 'ldrs/react';
import StarIcon from '@mui/icons-material/Star';

const CastMovies = () => {
  const { id } = useParams();
  const [castMovies, setCastMovies] = useState([]);
  const [castName, setCastName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseImage = 'https://image.tmdb.org/t/p/w185';

  const fetchCastMovies = async () => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_API_KEY;
      const personRes = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&include_adult=false`);
      const personData = await personRes.json();
      setCastName(personData.name);
      document.title = `${personData.name}'s Movies`;
      const res = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&include_adult=false`);
      const data = await res.json();
      setCastMovies(data.cast);
    } catch (error) {
      console.error('Error fetching cast movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCastMovies();
  }, [id]);

  const handleNavigation = (e, movieId) => {
    e.preventDefault();
    navigate(`/movie/${movieId}`);
    window.scrollTo(0, 0);
  };

  const filteredMovies = castMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="text-white min-h-screen bg-black pt-[10vh] px-4 pb-10">
        {/* Section Header */}
        <section className="text-center py-8 px-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 font-manrope">
            {castName}'s Movies
          </h1>
          <p className="text-gray-400 font-nunito text-sm sm:text-base">
            Here are the movies that feature <strong>{castName}</strong>.
          </p>
        </section>

        {/* Search Input */}
        <div className="w-full flex justify-center mb-10 px-4">
          <input
            type="text"
            placeholder="Search movie by title..."
            className="w-full sm:w-[75%] md:w-[60%] lg:w-[50%] bg-white/10 text-white border-b-2 border-white focus:outline-none p-3 placeholder-gray-300 hover:bg-opacity-20 transition-all font-nunito rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>

        {/* Results Info */}
        <section className="max-w-7xl mx-auto px-4">
          <p className="text-lg sm:text-xl font-manrope mb-6">
            <b>Obtained results:</b>{' '}
            <span className="text-2xl font-bold">{filteredMovies.length}</span> / {castMovies.length}
          </p>

          {/* Movie Grid */}
          {castMovies.length > 0 && !loading ? (
            filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {filteredMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    onClick={(e) => handleNavigation(e, movie.id)}
                    className="relative overflow-hidden rounded-md hover:cursor-pointer transition-transform duration-300 hover:scale-105 group"
                  >
                    {/* Rating Badge */}
                    <div className="absolute top-0 right-0 bg-black bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 rounded-bl-md flex items-center gap-1 z-10 font-nunito">
                      <StarIcon style={{ fontSize: '1rem' }} />
                      <p>{movie.vote_average != null ? Number(movie.vote_average).toFixed(1) : 'N/A'}</p>
                    </div>

                    {/* Movie Poster or Placeholder */}
                    {movie.poster_path ? (
                      <img
                        src={baseImage + movie.poster_path}
                        alt={movie.title}
                        className="aspect-[2/3] w-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="aspect-[2/3] w-full flex items-center justify-center bg-gray-800 rounded-md">
                        <MovieCreationIcon style={{ fontSize: '3rem', color: 'white' }} />
                      </div>
                    )}

                    {/* Movie Title */}
                    <p className="absolute bottom-0 w-full text-center text-white font-nunito text-[0.95rem] px-3 py-2 bg-black/60 backdrop-blur-md truncate">
                      {movie.title}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-white animate-pulse my-10 font-nunito">
                No matching results.
              </p>
            )
          ) : (
            // Loading Spinner
            <div className="w-full h-[40vh] flex items-center justify-center mt-10">
              <Tailspin size={50} stroke={5} speed={0.9} color="white" />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CastMovies;
