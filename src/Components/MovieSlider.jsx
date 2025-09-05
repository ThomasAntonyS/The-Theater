import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import StarIcon from '@mui/icons-material/Star';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const MovieSlider = ({ movies }) => {
  const scrollRef = useRef(null);
  const baseImage = 'https://image.tmdb.org/t/p/w185';

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = Math.max(clientWidth * 0.7, 200);
      const newScrollLeft =
        direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition);
      const observer = new ResizeObserver(checkScrollPosition);
      observer.observe(el);
      window.addEventListener('resize', checkScrollPosition);

      checkScrollPosition();

      return () => {
        el.removeEventListener('scroll', checkScrollPosition);
        observer.disconnect();
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [movies]);

  return (
    <div className='relative w-full py-4'>

      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-80 border text-white rounded-full p-2 transition-opacity duration-300 focus:outline-none ${
          atStart ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-opacity-90'
        }`}
      >
        <WestIcon className="text-xl sm:text-2xl" />
      </button>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-80 border text-white rounded-full p-2 sm:p-3 transition-opacity duration-300 focus:outline-none ${
          atEnd ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-opacity-90'
        }`}
      >
        <EastIcon className="text-xl sm:text-2xl" />
      </button>

      <div
        ref={scrollRef}
        className='flex gap-4 py-3 overflow-x-scroll no-scrollbar scroll-smooth px-4 sm:px-6 md:px-8'
      >
        {movies.map((movie, index) => (
          <Link
            to={`/movie/${movie.id}`}
            key={index}
            onClick={handleClick}
            className='relative flex-shrink-0 w-[45%] sm:w-[30%] md:w-[20%] lg:w-[13%] h-auto overflow-hidden rounded-md hover:cursor-pointer transition-transform duration-200 hover:scale-105'
            title={movie.title}
          >
            {/* Rating Badge */}
            <div className="absolute top-0 right-0 bg-black font-manrope rounded-b-sm bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 flex items-center gap-1 z-10">
              <StarIcon style={{ fontSize: '1rem' }} />
              <p className='h-max my-auto'>{movie.vote_average.toFixed(1)}</p>
            </div>

            {/* Movie Poster */}
            {movie.poster_path ? (
              <img
                src={baseImage + movie.poster_path}
                alt={movie.title}
                className='aspect-[2/3] w-full object-cover'
              />
            ) : (
              <div className='aspect-[2/3] w-full flex items-center justify-center bg-gray-800 rounded-[10px]'>
                <MovieCreationIcon style={{ fontSize: "3rem", color: "white" }} />
              </div>
            )}

            {/* Movie Title Overlay */}
            <p className='absolute w-full bottom-0 backdrop-blur-md bg-black/70 px-3 py-1 text-white text-[1.1rem] text-center truncate font-nunito object-cover'>
              {movie.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
