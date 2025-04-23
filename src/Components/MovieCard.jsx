import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieSlider from './MovieSlider';

const MovieCard = ({ title, url, navLink }) => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div data-aos="fade-right" data-aos-duration="1000" className='w-[95vw] mx-auto mb-10'>
      {movies.length > 0 && (
        <>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-4'>
            <p className='text-2xl sm:text-3xl text-white font-manrope mb-2 sm:mb-0'>{title}</p>
            {navLink && (
              <Link className='text-white border-b-2 font-nunito' to={navLink}>
                See More <span className='text-xl'>&#8594;</span>
              </Link>
            )}
          </div>

          <MovieSlider movies={movies} />
        </>
      )}
    </div>
  );
};

export default MovieCard;
