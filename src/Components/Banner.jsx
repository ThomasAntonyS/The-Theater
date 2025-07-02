import React, { useState, useEffect } from 'react';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';
import { Ping } from 'ldrs/react';
import 'ldrs/react/Ping.css';

const Banner = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bannerMovies, setBannerMovies] = useState([]);
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1368);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&include_adult=false`
        );
        const data = await response.json();
        const topMovies = data.results.slice(0, 10).map(movie => ({
          title: movie.title,
          desc: movie.overview,
          backdrop_image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          poster_image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Smaller poster for mobile
          link: `movie/${movie.id}`,
          banner_tag: movie.media_type === 'tv' ? 'Trending TV Show' : 'Trending Movie',
        }));
        setBannerMovies(topMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleNavigationClick = (newCount) => {
    if (newCount !== count) {
      setCurrentImageLoaded(false);
      setTimeout(() => {
        setCount(newCount);
      }, 500);
    }
  };

  const handleLeftClick = () => {
    handleNavigationClick((prev) => (prev === 0 ? bannerMovies.length - 1 : prev - 1));
  };

  const handleRightClick = () => {
    handleNavigationClick((prev) => (prev === bannerMovies.length - 1 ? 0 : prev + 1));
  };

  if (bannerMovies.length === 0 && loading) {
    return (
      <div className="relative h-[95vh] w-full overflow-hidden mb-6 flex items-center justify-center bg-black">
        <Ping size='60' stroke="3.5" speed="1.2" color="white" />
      </div>
    );
  }

  if (bannerMovies.length === 0) {
    return (
      <div className="relative h-[95vh] w-full overflow-hidden mb-6 flex items-center justify-center bg-black text-white text-xl font-manrope">
        No trending movies available at the moment.
      </div>
    );
  }

  const currentMovie = bannerMovies[count];
  const imageUrl = isMobile ? currentMovie.poster_image : currentMovie.backdrop_image;

  return (
    <div className="relative h-[95vh] w-full overflow-hidden mb-6">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center bg-black bg-opacity-95">
          <Ping size='60' stroke="3.5" speed="1.2" color="white" />
        </div>
      )}

      <img
        src={imageUrl}
        alt={currentMovie.title}
        onLoad={() => {
          setLoading(false);
          setCurrentImageLoaded(true);
        }}
        className={`absolute top-0 left-0 w-full h-full object-cover object-top -z-10 transition-opacity duration-500 ease-in-out ${currentImageLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>

      <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
        <button
          onClick={handleLeftClick}
          className="text-white text-2xl bg-black bg-opacity-75 px-4 py-2 rounded-full hover:bg-opacity-95 transition-all duration-300 focus:outline-none"
        >
          {'<'}
        </button>
        <button
          onClick={handleRightClick}
          className="text-white text-2xl bg-black bg-opacity-75 px-4 py-2 rounded-full hover:bg-opacity-95 transition-all duration-300 focus:outline-none"
        >
          {'>'}
        </button>
      </div>

      <div className={`absolute bottom-12 left-4 sm:left-10 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] z-20 text-white space-y-4 transition-opacity duration-500 ease-in-out ${currentImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-nunito bg-black bg-opacity-50 px-4 py-2 rounded-full w-max text-sm sm:text-base">
          {currentMovie.banner_tag}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-manrope leading-tight">
          {currentMovie.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg line-clamp-2 max-w-[90%] font-nunito leading-relaxed">
          {currentMovie.desc}
        </p>
        <div className="flex flex-wrap text-base items-center gap-3 font-nunito">
          <Link to={`/${currentMovie.link}`}
            className="flex items-center bg-white text-black px-5 py-2 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-lg">
            <PlayCircleOutlineRoundedIcon className="mr-2 text-xl" />
            Watch Movie
          </Link>
          <Link
            to={`/${currentMovie.link}`}
            className="text-white bg-white bg-opacity-30 hover:bg-opacity-50 px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 shadow-lg"
          >
            More Info <EastIcon className="inline text-base ml-1" />
          </Link>
        </div>
      </div>

      <div className="absolute flex bottom-4 right-10 space-x-2 z-30 justify-end">
        {bannerMovies.map((_, index) => (
          <div
            key={index}
            className="w-4 md:w-12 h-[5px] mx-1 rounded-full bg-white transition-all duration-300 cursor-pointer"
            style={{ opacity: index === count ? 1 : 0.3 }}
            onClick={() => {
              handleNavigationClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;