import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Tailspin } from 'ldrs/react'; 
import StarIcon from '@mui/icons-material/Star';
import 'ldrs/react/Tailspin.css';

const CastMovies = () => {
  const { id } = useParams();
  const [castMovies, setCastMovies] = useState([]);
  const [castName, setCastName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const baseImage = 'https://image.tmdb.org/t/p/w185';

  const fetchCastMovies = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;

      const personRes = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&include_adult=false`);
      const personData = await personRes.json();
      setCastName(personData.name);
      document.title = personData.name + "'s Movies"
      const res = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&include_adult=false`);
      const data = await res.json();
      setCastMovies(data.cast);
    } catch (error) {
      console.error('Error fetching cast movies:', error);
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

  const filteredMovies = castMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="text-white min-h-screen bg-black pt-[10vh] px-4">
        {/* Cast Info */}
        <section className="text-center py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-manrope">{castName}'s Movies</h1>
          <p className="text-gray-400 font-nunito">
            Here are the movies that feature <strong>{castName}</strong>.
          </p>
        </section>

        {/* Search box */}
        <div className=' w-full sm:w-[50%] flex mx-auto justify-center mb-8'>
          <input
            type="text"
            placeholder="Search movie by title..."
            className="w-[80%] sm:w-[60%] bg-white/10 text-white border-b-2 border-white focus:outline-none p-2 placeholder-gray-300 hover:bg-opacity-20 transition-all font-nunito"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>

        {/* Movies */}
        <section className="px-4 my-16">
          <p className='gap-6 max-w-7xl mx-auto mb-5 font-manrope text-[1.4rem]'><b>Obtained results:</b> <span className=' text-[2rem] font-bold'>{filteredMovies.length}</span> / {castMovies.length}</p>
          {castMovies.length > 0 ? (   
            filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {filteredMovies.map((movie, index) => (
                  <Link
                    key={index}
                    onClick={(e) => handleNavigation(e, movie.id)}
                    className="p-2 rounded hover:scale-105 transition-transform"
                  >
                    <div className="relative">
                      {movie.poster_path ? (
                        <img
                          src={baseImage + movie.poster_path}
                          alt={movie.title}
                          className="w-full h-auto rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-[240px] flex items-center justify-center rounded-lg mb-2 bg-gray-800">
                          <MovieCreationIcon style={{ fontSize: '4rem', color: 'gray' }} />
                        </div>
                      )}

                        <div className="absolute top-1 right-1 bg-black font-manrope bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10">
                            <StarIcon style={{ fontSize: '1rem' }} />
                            <p className=' h-max my-auto'>{movie.vote_average.toFixed(1)}</p>
                        </div>
                    </div>

                    <p className="text-sm text-center font-nunito line-clamp-2">{movie.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-white animate-pulse my-10 font-nunito">No matching results.</p>
            )
          ) : (
            <div className="w-full h-screen flex items-start justify-center bg-black">
              <Tailspin size={50} stroke={5} speed={0.9} color="white" />
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default CastMovies;
