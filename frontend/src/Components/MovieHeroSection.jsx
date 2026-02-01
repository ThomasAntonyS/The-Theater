import PlaceHolderImage from '../assets/placeholder_movie.png'
import { RiMovieLine } from "react-icons/ri";
import { FiCalendar, FiStar } from "react-icons/fi";
import { useState, useEffect } from 'react';

const MovieHeroSection = ({ item, handleWatchlist }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Release Unknown";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-manrope">
      <div className="absolute inset-0 z-0">
        <img
          src={isMobile ? 
            item.poster_path?`https://image.tmdb.org/t/p/w500${item.poster_path}` : PlaceHolderImage 
            : 
            item.backdrop_path?`https://image.tmdb.org/t/p/original${item.backdrop_path}` : PlaceHolderImage
          }
          alt={item.title}
          className="h-full w-full object-cover opacity-70 md:opacity-60 transition-transform duration-[10s] scale-105 hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505] md:bg-gradient-to-r md:from-[#050505] md:via-[#050505]/40 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-[1400px] mx-auto flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-16 pb-12 md:pb-0">
        <div 
          className="max-w-4xl space-y-4 md:space-y-8" 
          data-aos="fade-up" 
          data-aos-duration="1000"
        >

          <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs font-black tracking-[0.1em] uppercase">
            <div className="flex items-center gap-2 text-red-300 backdrop-blur-md px-2 py-1 rounded md:bg-transparent md:p-0">
              <FiCalendar />
              <span>{formatDate(item.release_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-300 backdrop-blur-md px-2 py-1 rounded md:bg-transparent md:p-0">
              <FiStar />
              <span>{item.vote_average?.toFixed(1)} / 10</span>
            </div>
          </div>

          <h1
            style={{ textWrap: 'balance' }}
            className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.9] md:leading-[0.85]"
          >
            {item.original_title || item.title}
          </h1>

          <p className="font-nunito text-sm md:text-xl text-white/70 md:text-white/60 max-w-xl leading-relaxed italic font-light border-l-2 border-red-600/50 pl-4 md:pl-6 line-clamp-3 md:line-clamp-none">
            {item.overview}
          </p>

          <div className="pt-2 md:pt-6">
            <button
              onClick={handleWatchlist}
              className="group relative w-max sm:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-5 py-3 rounded-md font-black uppercase tracking-wide text-[10px] md:text-xs transition-all duration-300 hover:bg-red-600 hover:text-white md:hover:pr-12"
            >
              <RiMovieLine size={20} />
              <span>Add to Watchlist</span>
              <div className="hidden md:block absolute right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                &rarr;
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex absolute bottom-10 left-10 flex-col items-start gap-2 opacity-70">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Scroll</span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-white to-transparent" />
      </div>
    </section>
  );
};

export default MovieHeroSection;