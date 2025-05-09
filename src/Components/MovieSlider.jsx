import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import StarIcon from '@mui/icons-material/Star';

const MovieSlider = ({ movies }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const baseImage = 'https://image.tmdb.org/t/p/w300';

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
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
    <div className='relative w-full py-4 px-4'>

      {!atStart && (
        <button
          onClick={() => scroll('left')}
          className="w-max text-2xl px-3 py-2 absolute left-4 border top-[45%] z-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-80 transition"
        >
          <WestIcon />
        </button>
      )}

      {!atEnd && (
        <button
          onClick={() => scroll('right')}
          className="w-max text-2xl px-3 py-2 absolute right-4 border top-[45%] z-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-80 transition"
        >
          <EastIcon />
        </button>
      )}

      <div
        ref={scrollRef}
        className='flex gap-4 py-3 overflow-x-scroll no-scrollbar scroll-smooth'
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            onClick={() => handleClick(movie.id)}
            className='relative flex-shrink-0 w-[65vw] sm:w-[40vw] md:w-[28vw] lg:w-[18vw] xl:w-[13vw] bg-[#1e1e1e] rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md group'
          >
            {movie.poster_path ? (
              <img
                src={baseImage + movie.poster_path}
                alt={movie.title}
                className='w-full h-[35vh] object-cover rounded-t-lg'
              />
            ) : (
              <div className='h-[35vh] w-full flex items-center justify-center bg-gray-700 rounded-t-lg text-white text-5xl'>
                🎬
              </div>
            )}

            <div className="absolute top-2 right-2 bg-black bg-opacity-80 backdrop-blur-md text-white font-manrope text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10">
              <StarIcon style={{ fontSize: '1rem', height:'max', margin:'auto 0px' }} />
              <p className=' h-max my-auto'>{movie.vote_average.toFixed(1)}</p>
            </div>

            <div className='p-2'>
              <p className='text-white text-sm truncate font-manrope'>{movie.title}</p>
              <span className='text-gray-400 text-xs group-hover:text-white font-nunito hover:underline pb-1'>
                More Info →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
