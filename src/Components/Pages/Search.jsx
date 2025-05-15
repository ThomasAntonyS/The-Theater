import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [movie, setMovie] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchMovie, setSearchMovie] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const fetchSearches = async () => {
    if (inputRef.current) inputRef.current.blur();
    const apiKey = process.env.REACT_APP_API_KEY;
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovie}&page=${pageNo}&include_adult=false`
    );
    const search = await data.json();
    if (search.results.length === 0) {
      alert('Please enter a valid movie');
      setMovie([]);
    } else {
      setMovie(search.results);
      setTotalPages(search.total_pages);
    }
  };

  useEffect(() => {
    if (searchMovie) fetchSearches();
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

  return (
    <>
      <Header />
      <div className="text-white min-h-screen bg-black mt-[10vh]">
        <section className="text-center px-4 sm:px-8 lg:px-16 py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 font-manrope">Find Your Movie</h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto font-nunito">
            If you’re searching for your next movie, consider diving into a world where emotions
            run deep and stories captivate.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 px-4 mx-auto sm:w-[60%]">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search your movie..."
            className="w-full font-nunito sm:w-1/2 bg-black text-white border-b-2 border-white focus:outline-none px-2 py-2 placeholder-gray-300 hover:bg-opacity-20 transition-all"
            value={searchMovie}
            onKeyDown={(e) => e.key === 'Enter' && fetchSearches()}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button
            onClick={() => {
              setPageNo(1);
              fetchSearches();
            }}
            className="bg-white font-manrope bg-opacity-20 px-6 py-2 rounded hover:bg-opacity-30 transition-all"
          >
            Search
          </button>
        </div>

        <section className="px-4 my-16">
          {movie.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {movie.map((movie, index) => (
                  <Link
                    key={index}
                    onClick={(e) => handleNavigation(e, movie.id)}
                    className="relative p-2 rounded hover:scale-105 transition-transform"
                  >
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10">
                      <StarIcon style={{ fontSize: '1rem' }} />
                        <p className="h-max my-auto">
                          {movie.vote_average != null ? Number(movie.vote_average).toFixed(1) : 'N/A'}
                        </p>            
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
                <span className="text-lg">{pageNo} / {totalPages}</span>
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
            <p className="text-center text-white animate-pulse my-10 font-nunito">Search your favorite movie</p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Search;
