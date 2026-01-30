import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import StarIcon from '@mui/icons-material/Star';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const MovieSlider = ({ movies }) => {
  const scrollRef = useRef(null);
  const baseImage = 'https://image.tmdb.org/t/p/w342';

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition);
      const observer = new ResizeObserver(checkScrollPosition);
      observer.observe(el);
      checkScrollPosition();
      return () => {
        el.removeEventListener('scroll', checkScrollPosition);
        observer.disconnect();
      };
    }
  }, [movies]);

  return (
    <div className='relative w-full group/slider'>
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/40 backdrop-blur-xl border border-white/10 text-white rounded-r-xl p-3 transition-all duration-300 ${
          atStart ? 'opacity-0 pointer-events-none -translate-x-full' : 'opacity-100 hover:bg-white hover:text-black'
        }`}
      >
        <WestIcon fontSize="medium" />
      </button>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/40 backdrop-blur-xl border border-white/10 text-white rounded-l-xl p-3 transition-all duration-300 ${
          atEnd ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-100 hover:bg-white hover:text-black'
        }`}
      >
        <EastIcon fontSize="medium" />
      </button>

      <div
        ref={scrollRef}
        className='flex gap-4 md:gap-6 py-6 overflow-x-auto no-scrollbar scroll-smooth px-2 md:px-4'
      >
        {movies.map((movie, index) => (
          <Link
            to={`/movie/${movie.id}`}
            key={index}
            onClick={handleClick}
            className='relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] group transition-all duration-500 rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl'
            title={movie.title}
          >
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-manrope font-black px-2 py-1 rounded flex items-center gap-1 z-20 shadow-lg">
              <StarIcon className="text-yellow-500" style={{ fontSize: '0.9rem' }} />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>

            <div className="relative aspect-[2/3] overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={baseImage + movie.poster_path}
                  alt={movie.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1'
                />
              ) : (
                <div className='w-full h-full flex flex-col items-center justify-center bg-zinc-900 gap-2'>
                  <MovieCreationIcon className="text-zinc-700" style={{ fontSize: "3rem" }} />
                  <span className="text-[10px] text-zinc-500 font-manrope font-bold tracking-widest uppercase">No Image</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </div>

            <div className="absolute bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white font-manrope font-black text-sm md:text-base leading-tight italic tracking-tighter uppercase line-clamp-2 drop-shadow-lg">
                {movie.title}
              </p>
              <p className="text-white/70 font-nunito text-[10px] md:text-xs mt-1 font-bold tracking-widest uppercase">
                {movie.release_date?.split('-')[0] || 'TBA'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;