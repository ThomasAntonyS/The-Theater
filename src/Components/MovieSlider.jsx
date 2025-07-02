import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import StarIcon from '@mui/icons-material/Star';

const MovieSlider = ({ movies }) => {
  const scrollRef = useRef(null);
  const baseImage = 'https://image.tmdb.org/t/p/w300';

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();

      return () => {
        el.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className='relative w-full py-4 px-4 '>

      {!atStart && (
        <button
          onClick={() => scroll('left')}
          className="hidden sm:block w-max text-2xl px-3 py-2 absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-80 transition focus:outline-none"
        >
          <WestIcon />
        </button>
      )}

      {!atEnd && (
        <button
          onClick={() => scroll('right')}
          className="hidden sm:block w-max text-2xl px-3 py-2 absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-80 transition focus:outline-none"
        >
          <EastIcon />
        </button>
      )}

      <div
        ref={scrollRef}
        className='flex gap-4 py-3 overflow-x-scroll no-scrollbar scroll-smooth'
      >
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.id}`}
            key={index}
            onClick={() => handleClick()}
            className='relative flex-shrink-0 w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[15vw] xl:w-[12vw] bg-[#1e1e1e] rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md group'
          >
            {movie.poster_path ? (
              <img
                src={baseImage + movie.poster_path}
                alt={movie.title}
                className='w-full h-auto aspect-[2/3] object-cover rounded-t-lg'
              />
            ) : (
              <div className='w-full h-auto aspect-[2/3] flex items-center justify-center bg-gray-700 rounded-t-lg text-white text-5xl'>
                🎬
              </div>
            )}

            <div className="absolute top-2 right-2 bg-black bg-opacity-80 backdrop-blur-sm text-white font-manrope text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10">
              <StarIcon style={{ fontSize: '0.9rem' }} />
              <p className='h-max my-auto'>{movie.vote_average.toFixed(1)}</p>
            </div>

            <div className='p-2'>
              <p className='text-white text-sm sm:text-base font-manrope truncate'>{movie.title}</p>
              <span className='text-gray-400 text-xs sm:text-sm group-hover:text-white font-nunito hover:underline pb-1'>
                More Info →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;