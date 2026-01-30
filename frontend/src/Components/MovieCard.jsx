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

  const handleClick = (e, navLink) => {
    e.preventDefault();
    navigate(navLink);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className='w-full max-w-[1400px] mx-auto mb-16 px-4 md:px-8'>
      {movies.length > 0 && (
        <>
          <div className='flex items-end justify-between mb-2 border-b border-white/5 pb-4'>
            <div className='flex items-center gap-4'>
              <div className='w-1 h-8 md:h-10 bg-red-600 rounded-full' />
              <h2 className='text-3xl md:text-5xl text-white font-manrope font-black italic tracking-tighter uppercase'>
                {title}
              </h2>
            </div>

            {navLink && (
              <Link 
                className='hidden md:flex items-center gap-2 text-white/70 font-manrope font-bold text-[10px] tracking-[0.2em] uppercase hover:text-white transition-all group'
                onClick={e => handleClick(e, navLink)}
              >
                Explore All
                <span className='bg-white/5 p-1 rounded-md group-hover:bg-red-600 group-hover:text-white transition-colors'>
                    <KeyboardArrowRightIcon fontSize='small'/>
                </span>
              </Link>
            )}
          </div>

          <div className='relative'>
             <MovieSlider movies={movies} />
          </div>

          {navLink && (
            <div className='md:hidden mt-4'>
              <Link 
                className='flex items-center justify-center w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white font-manrope font-bold text-xs tracking-widest uppercase active:scale-95 transition-transform'
                onClick={e => handleClick(e, navLink)}
              >
                Browse Full Collection
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MovieCard;