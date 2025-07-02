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
      const scrollAmount = Math.max(clientWidth * 0.7, 200); 
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

      checkScrollPosition(); // Initial check

      return () => {
        el.removeEventListener('scroll', checkScrollPosition);
        observer.disconnect();
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [movies]); // Re-run effect if movies change

  return (
    <div className='relative w-full py-4'>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2  top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-90 text-white rounded-full p-2 transition-opacity duration-300 focus:outline-none ${atStart ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-opacity-90'}`}
      >
        <WestIcon className="text-xl sm:text-2xl" />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-2  top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-90 text-white rounded-full p-2 sm:p-3 transition-opacity duration-300 focus:outline-none ${atEnd ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-opacity-90'}`}
      >
        <EastIcon className="text-xl sm:text-2xl" />
      </button>

      <div
        ref={scrollRef}
        className='flex gap-4 py-3 overflow-x-scroll no-scrollbar scroll-smooth px-4 sm:px-6 md:px-8'
      >
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.id}`}
            key={index}
            onClick={() => handleClick()}
            className='relative flex-shrink-0 w-[50vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw] bg-[#1e1e1e] rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md group'
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