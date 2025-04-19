import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieSlider = ({ movies }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const baseImage = 'https://image.tmdb.org/t/p/w300';

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative w-full py-4 px-4'>
      <button
        onClick={() => scroll('left')}
        className='absolute left-0 top-[45%] z-10 bg-black bg-opacity-90 border text-[2rem] px-4 text-white rounded-full hover:bg-opacity-80 transition'
      >
        &#8592;
      </button>

      <button
        onClick={() => scroll('right')}
        className='absolute right-0 top-[45%] z-10 bg-black bg-opacity-90 border text-white text-[2rem] px-4 rounded-full hover:bg-opacity-80 transition'
      >
        &#8594;
      </button>

      <div
        ref={scrollRef}
        className='flex gap-4 py-3 overflow-x-scroll no-scrollbar scroll-smooth'
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            onClick={() => handleClick(movie.id)}
            className='flex-shrink-0 w-[65vw] sm:w-[40vw] md:w-[28vw] lg:w-[18vw] xl:w-[13vw] bg-[#1e1e1e] rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md group'
          >
            {movie.poster_path ? (
              <img
                src={baseImage + movie.poster_path}
                alt={movie.title}
                className='w-full h-[35vh] object-cover rounded-t-lg'
              />
            ) : (
              <div className='h-[25vh] w-full flex items-center justify-center bg-gray-700 rounded-t-lg text-white text-5xl'>
                🎬
              </div>
            )}
            <div className='p-2'>
              <p className='text-white text-sm truncate'>{movie.title}</p>
              <span className='text-gray-400 text-xs group-hover:text-white'>
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
