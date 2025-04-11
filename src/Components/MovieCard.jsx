import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const MovieCard = ({ title, url, navLink }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovie = async () => {
    try {
      const data = await fetch(url);
      const movie = await data.json();
      setMovies(movie.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const handleNavigation = (e, id) => {
    e.preventDefault();
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  const baseImage = 'https://image.tmdb.org/t/p/w185';

  return (
    <div className='Card block overflow-hidden w-[95vw] mx-auto mb-10'>
      {movies.length > 0 && (
        <>
          {/* Header: Title left, See More right */}
          <div className=' flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-4'>
            <p className=' text-2xl sm:text-3xl text-white font-manrope mb-2 sm:mb-0'>
              {title}
            </p>

            {navLink && (
              <Link
                className=' text-white border-b-2 font-nunito'
                to={navLink}
              >
                See More <span className=' text-xl'>&#8594;</span>
              </Link>
            )}
          </div>

          {/* Movie Cards */}
          <div className='relative flex overflow-x-auto overflow-y-hidden px-4 py-3 w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent font-nunito'>
            <div className='flex gap-4'>
              {movies.map((movie, index) => (
                <div
                  key={index}
                  onClick={(e) => handleNavigation(e, movie.id)}
                  className=' relative flex-shrink-0 w-[70vw] sm:w-[40vw] md:w-[28vw] lg:w-[18vw] xl:w-[13vw] cursor-pointer group'
                >
                  {movie.poster_path ? (
                    <img
                      src={baseImage + movie.poster_path}
                      alt={movie.title}
                      className='h-[65%] w-full object-cover transition-transform duration-200 group-hover:scale-105'
                    />
                  ) : (
                    <div className='h-[65%] w-full flex items-center justify-center bg-gray-800 rounded-lg text-white'>
                      <MovieCreationIcon style={{ fontSize: '6rem' }} />
                    </div>
                  )}

                  <p className=' overflow-hidden w-full text-white text-[0.9rem] sm:text-[1.2rem] mt-12 leading-tight truncate'>
                    {movie.title}
                  </p>

                  <Link
                    to={`/movie/${movie.id}`}
                    className='absolute bottom-2 left-2 text-slate-300 text-sm sm:text-[1rem] hover:text-white transition'
                    onClick={(e) => e.stopPropagation()}
                  >
                    More Info<span className='text-base ml-1'>&#8594;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
