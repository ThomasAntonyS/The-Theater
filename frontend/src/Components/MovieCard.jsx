import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieSlider from './MovieSlider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MovieCard = ({ title, url, navLink }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storageKey = title;

    const cachedData = sessionStorage.getItem(storageKey);
    if (cachedData) {
      setMovies(JSON.parse(cachedData));
    } else {
      const fetchMovie = async () => {
        try {
          const data = await fetch(url);
          const movie = await data.json();
          setMovies(movie.results);
          sessionStorage.setItem(storageKey, JSON.stringify(movie.results));
        } catch (error) {
          console.log(error);
        }
      };

      fetchMovie();
    }
  }, [title, url]);

  function handleClick(e, navLink) {
    e.preventDefault();
    navigate(navLink);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div data-aos="fade-right" data-aos-duration="1000" className='w-[95vw] mx-auto mb-10 px-2'>
      {movies.length > 0 && (
        <>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full'>
            <p className='text-2xl sm:text-3xl text-white font-manrope mb-2 sm:mb-0'>{title}</p>
            {navLink && (
              <Link className='hidden sm:flex text-white font-nunito hover:border-b border-white' onClick={e => handleClick(e, navLink)}>
                Browse Full Collection
                <span className='flex my-auto h-max'><KeyboardArrowRightIcon style={{ margin:"auto", }} fontSize='small'/></span>
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
