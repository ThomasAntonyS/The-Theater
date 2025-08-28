import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close'; 
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const suggestionsRef = useRef(null); 

  useEffect(() => {
    document.title = 'Search for your favourite movies';
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchMovies = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a movie name to search.');
      return;
    }
    if (inputRef.current) inputRef.current.blur();
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNo}&include_adult=false`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        alert('No movies found. Please try a different movie name.');
        setMovies([]);
        setTotalPages(0);
      } else {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      alert('Failed to fetch movies. Please try again later.');
    }
  };

  useEffect(() => {
    if (searchQuery) fetchMovies();
  }, [pageNo]);

  const handleNavigation = (e, id) => {
    e.preventDefault();
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  const baseImage = 'https://image.tmdb.org/t/p/w185';

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (pageNo < totalPages) {
      setPageNo((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPageNo(1);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (query.trim()) {
      debounceTimeout.current = setTimeout(async () => {
        const apiKey = import.meta.env.VITE_API_KEY;
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
              query
            )}&page=1&include_adult=false`
          );
          const data = await response.json();
          setSuggestions(data.results.slice(0, 6));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }, 400);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setMovies([]);
    setSuggestions([]);
    setShowSuggestions(false);
    setPageNo(1);
    setTotalPages(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Header />
      <div className="text-white min-h-screen bg-black pt-[10vh] px-4 sm:px-8 lg:px-16">
        <section className="text-center py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 font-manrope">
            Find Your Movie
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-nunito">
            Discover your next cinematic adventure. Explore a vast collection of films
            and dive into captivating stories.
          </p>
        </section>

        <div className="relative max-w-3xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-20">
            <div className="relative flex-1 w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search your movie..."
                className="w-full bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-blue-400 px-2 py-2 pr-10 placeholder-gray-400 font-nunito transition-colors duration-300"
                value={searchQuery}
                onKeyDown={(e) => e.key === 'Enter' && fetchMovies()}
                onChange={handleInputChange}
                onFocus={() => searchQuery.trim() && suggestions.length > 0 && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setPageNo(1);
                fetchMovies();
                setShowSuggestions(false);
              }}
              className="bg-blue-600 text-white font-manrope px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <SearchIcon />
              Search
            </button>

            {showSuggestions && suggestions.length > 0 && (
              <div ref={suggestionsRef} className="absolute top-full left-0 w-full bg-white text-black shadow-lg rounded-b-lg mt-1 max-h-60 overflow-y-auto z-50 font-nunito border border-gray-200">
                {suggestions.map((movie) => (
                  <div
                    key={movie.id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center transition-colors duration-200"
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                      setShowSuggestions(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded mr-3 flex-shrink-0 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-300 rounded mr-3 flex items-center justify-center flex-shrink-0">
                        <MovieCreationIcon style={{ fontSize: '1.5rem', color: 'gray' }} />
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="font-semibold font-manrope line-clamp-1 text-gray-800">{movie.title}</p>
                      <p className="text-sm text-gray-600 font-nunito">
                        {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
                        {movie.vote_average != null && ` | Rating: ${Number(movie.vote_average).toFixed(1)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <section className="py-16">
          {movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    onClick={(e) => handleNavigation(e, movie.id)}
                    className="relative p-2 rounded-lg transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10 font-nunito shadow-md">
                      <StarIcon style={{ fontSize: '1rem', color: '#FFD700' }} />
                      <p>{movie.vote_average != null ? Number(movie.vote_average).toFixed(1) : 'N/A'}</p>
                    </div>

                    {movie.poster_path ? (
                      <img
                        src={baseImage + movie.poster_path}
                        alt={movie.title}
                        className="w-full h-[90%] object-cover rounded-lg mb-2 shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-[240px] flex items-center justify-center rounded-lg mb-2 bg-gray-800">
                        <MovieCreationIcon style={{ fontSize: '4rem', color: 'gray' }} />
                      </div>
                    )}
                    <p className="text-sm sm:text-base text-center font-manrope font-semibold truncate mt-1 px-1">
                      {movie.title}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center items-center gap-6 my-12 font-nunito text-white">
                <button
                  onClick={handlePrev}
                  disabled={pageNo === 1}
                  className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors duration-300 text-lg font-semibold"
                >
                  ← Previous
                </button>
                <span className="text-lg sm:text-xl font-manrope font-bold">
                  {pageNo} / {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={pageNo === totalPages}
                  className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors duration-300 text-lg font-semibold"
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400 animate-pulse my-20 font-nunito text-xl sm:text-2xl">
              Start by typing a movie name above...
            </p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Search;