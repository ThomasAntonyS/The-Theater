import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
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

  useEffect(() => {
    document.title = 'Search for your favourite movies';
  }, []);

  const fetchMovies = async () => {
    if (!searchQuery.trim()) return;
    if (inputRef.current) inputRef.current.blur();
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNo}&include_adult=false`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        alert('No movies found. Please enter a valid movie name.');
        setMovies([]);
      } else {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
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
        const apiKey = process.env.REACT_APP_API_KEY;
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

  return (
    <>
      <Header />
      <div className="text-white min-h-screen bg-black pt-[10vh] px-4 sm:px-8 lg:px-16">
        <section className="text-center py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 font-manrope">
            Find Your Movie
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-nunito">
            If you’re searching for your next movie, consider diving into a world where emotions run deep and stories captivate.
          </p>
        </section>

        <div className="relative max-w-3xl mx-auto w-full">
          <div className="flex flex-col w-full sm:flex-row items-center gap-4 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your movie..."
              className="flex-1 w-full bg-black text-center text-white border-b-2 border-white focus:outline-none px-2 py-2 placeholder-gray-400 font-nunito"
              value={searchQuery}
              onKeyDown={(e) => e.key === 'Enter' && fetchMovies()}
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                setPageNo(1);
                fetchMovies();
                setShowSuggestions(false)
              }}
              className="bg-white text-black font-manrope px-6 py-2 rounded hover:bg-opacity-80 transition-all"
            >
              Search
            </button>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg rounded mt-2 max-h-60 overflow-y-auto z-50 font-nunito">
                {suggestions.map((movie) => (
                  <div
                    key={movie.id}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
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
                        className="w-10 h-14 object-cover rounded mr-3"
                      />
                    ) : (
                      <div className="w-10 h-14 bg-gray-300 rounded mr-3 flex items-center justify-center">
                        <MovieCreationIcon style={{ fontSize: '1rem', color: 'gray' }} />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold font-manrope">{movie.title}</p>
                      <p className="text-sm text-black font-nunito">
                        {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} |{' '}
                        {movie.vote_average != null ? Number(movie.vote_average).toFixed(1) : 'N/A'}
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
                    className="relative p-2 rounded hover:scale-105 transition-transform"
                  >
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10">
                      <StarIcon style={{ fontSize: '1rem' }} />
                      <p>{movie.vote_average != null ? Number(movie.vote_average).toFixed(1) : 'N/A'}</p>
                    </div>

                    {movie.poster_path ? (
                      <img
                        src={baseImage + movie.poster_path}
                        alt={movie.title}
                        className="w-full h-auto rounded-lg mb-2"
                      />
                    ) : (
                      <div className="w-full h-[240px] flex items-center justify-center rounded-lg mb-2 bg-gray-800">
                        <MovieCreationIcon style={{ fontSize: '4rem', color: 'gray' }} />
                      </div>
                    )}
                    <p className="text-sm text-center font-nunito">{movie.title}</p>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center items-center gap-6 my-12 font-nunito text-white">
                <button
                  onClick={handlePrev}
                  disabled={pageNo === 1}
                  className="px-4 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 disabled:opacity-30"
                >
                  ←
                </button>
                <span className="text-lg">
                  {pageNo} / {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={pageNo === totalPages}
                  className="px-4 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-white animate-pulse my-10 font-nunito">
              Search your favorite movie
            </p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Search;
