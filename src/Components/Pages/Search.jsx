import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CachedIcon from '@mui/icons-material/Cached';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [movie, setMovie] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchMovie, setSearchMovie] = useState('');
  const navigate = useNavigate();

  const fetchSearches = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovie}&page=${pageNo}&include_adult=false`
    );
    const search = await data.json();
    if (search.results.length === 0) alert('Please enter a valid movie');
    else {
      setMovie(search.results);
      setTotalPages(search.total_pages);
    }
  };

  function handleNavigation(e, id) {
    e.preventDefault();
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  }

  function handleRefresh(e) {
    e.preventDefault();
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
      fetchSearches();
    } else {
      alert('No more results');
    }
  }

  const baseImage = 'https://image.tmdb.org/t/p/w185';

  return (
    <>
      <Header />

      <div className="text-white min-h-screen bg-black mt-[10vh]">
        {/* Intro Section */}
        <section className="text-center px-4 sm:px-8 lg:px-16 py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Find Your Movie</h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto">
            If you’re searching for your next movie, consider diving into a world where emotions
            run deep and stories captivate. From epic adventures and heartfelt dramas to thrilling
            mysteries and side-splitting comedies, there's a film for every mood.
          </p>
        </section>

        {/* Search Box */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 px-4">
          <input
            type="text"
            placeholder="Search your movie..."
            className="w-full sm:w-1/2 bg-black text-white border-b-2 border-white focus:outline-none px-4 py-2 placeholder-gray-300 hover:bg-opacity-20 transition-all"
            value={searchMovie}
            onKeyDown={(e) => (e.key === 'Enter' ? fetchSearches() : null)}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button
            onClick={fetchSearches}
            className="bg-white bg-opacity-20 px-6 py-2 rounded hover:bg-opacity-30 transition-all"
          >
            Search
          </button>
        </div>

        {/* Refresh Button */}
        {movie.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-white bg-opacity-20 px-6 py-2 rounded hover:bg-opacity-30 transition-all"
            >
              <CachedIcon />
              Refresh
            </button>
          </div>
        )}

        {/* Movie Results */}
        <section className="px-4 my-16">
          {movie.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {movie.map((movie, index) => (
                <Link
                  key={index}
                  onClick={(e) => handleNavigation(e, movie.id)}
                  className=" p-2 rounded hover:scale-105 transition-transform"
                >
                  {movie.poster_path ? (
                    <img
                      src={baseImage + movie.poster_path}
                      alt={movie.title}
                      className="w-full h-auto rounded-lg mb-2"
                    />
                  ) : (
                    <div className="w-full h-[240px] flex items-center justify-center rounded-lg mb-2">
                      <MovieCreationIcon style={{ fontSize: '4rem', color: 'gray' }} />
                    </div>
                  )}
                  <p className="text-sm text-center">{movie.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 animate-pulse my-10">
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
