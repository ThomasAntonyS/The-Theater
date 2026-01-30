import React, { useState, useEffect, useRef } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Tailspin } from 'ldrs/react';
import 'ldrs/react/Tailspin.css';

const Search = () => {
  const { q, page_no } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const suggestionsRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [pageNo, setPageNo] = useState(Number(page_no) || 1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const backendBaseUrl = import.meta.env.VITE_API_BASE;
  const baseImage = 'https://image.tmdb.org/t/p/w342';

  useEffect(() => {
    document.title = 'Search — The Theater';
  }, []);

  useEffect(() => {
    setSearchQuery(q || '');
    setPageNo(Number(page_no) || 1);
    if (q) fetchMovies(q, Number(page_no) || 1);
  }, [q, page_no]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchMovies = async (query, page) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${backendBaseUrl}/api/search?query=${encodeURIComponent(query)}&page=${page}`);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    window.scroll({top:0, behavior:"smooth"})
  },[pageNo])

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    if (inputRef.current) inputRef.current.blur();
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(searchQuery)}/page/1`);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (query.trim()) {
      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(`${backendBaseUrl}/api/search?query=${encodeURIComponent(query)}&page=1`);
          const data = await response.json();
          setSuggestions(data.results.slice(0, 6));
          setShowSuggestions(true);
        } catch (error) { console.error(error); }
      }, 400);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <Header />
      <div className="pt-[15vh] px-6 md:px-12 max-w-[1400px] mx-auto">
        
        <header className="mb-16">
          <h1 className="text-5xl md:text-8xl font-manrope font-black italic uppercase tracking-tighter text-white leading-none mb-4">
            Search <span className="text-red-600 block md:inline">Library</span>
          </h1>
          <p className="font-nunito text-white/70 text-lg max-w-xl">
            Access thousands of titles instantly. Filter through trending hits and hidden cinematic gems.
          </p>
        </header>

        <div className="relative z-50 mb-20">
          <div className="flex items-end gap-6 border-b-2 border-white/10 focus-within:border-red-600 transition-all duration-500 pb-4">
            <SearchIcon className="text-white/70 mb-1" fontSize="large" />
            <input
              ref={inputRef}
              type="text"
              placeholder="TYPE MOVIE TITLE..."
              className="w-full bg-transparent text-2xl md:text-4xl font-manrope font-bold text-white focus:outline-none placeholder:text-white/70 uppercase tracking-tighter"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => searchQuery.trim() && suggestions.length > 0 && setShowSuggestions(true)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-white/70 hover:text-red-600 transition-colors">
                <CloseIcon />
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionsRef} className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl mt-4 overflow-hidden shadow-2xl">
              {suggestions.map((movie) => (
                <div
                  key={movie.id}
                  className="px-6 py-4 hover:bg-white/5 cursor-pointer flex items-center border-b border-white/5 transition-colors"
                  onClick={() => { navigate(`/movie/${movie.id}`); setShowSuggestions(false); }}
                >
                  <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} className="w-12 h-16 object-cover rounded bg-zinc-900" alt="" />
                  <div className="ml-6">
                    <p className="text-white font-manrope font-bold uppercase text-sm tracking-widest">{movie.title}</p>
                    <p className="text-white/70 font-nunito text-xs mt-1">{movie.release_date?.slice(0, 4)} — Rating: {movie.vote_average?.toFixed(1)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <main className="pb-20">
          {loading ? (
            <div className="flex justify-center py-20"><Tailspin size={50} color="white" /></div>
          ) : movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-red-600 transition-all duration-500"
                  >
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-manrope font-black px-2 py-1 rounded z-20">
                      <StarIcon className="text-yellow-500" style={{ fontSize: '0.9rem' }} />
                      <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    <div className="aspect-[2/3] overflow-hidden">
                      {movie.poster_path ? (
                        <img src={baseImage + movie.poster_path} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={movie.title} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900"><MovieCreationIcon className="text-zinc-700" fontSize="large" /></div>
                      )}
                    </div>
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                      <p className="text-white font-manrope font-black text-sm italic uppercase tracking-tighter truncate">{movie.title}</p>
                      <p className="text-white/70 font-nunito text-[10px] mt-1 font-bold tracking-widest uppercase">{movie.release_date?.slice(0, 4)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-20">
                  <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl">
                    <button onClick={() => navigate(`/search/${q}/page/${pageNo-1}`)} disabled={pageNo === 1} className="w-12 h-12 flex items-center justify-center rounded-xl text-white bg-white/5 hover:bg-red-600 disabled:opacity-20 transition-all"><ChevronLeft /></button>
                    <span className="text-white font-manrope font-black text-lg italic">{pageNo} <span className="text-white/20 mx-1">/</span> {totalPages}</span>
                    <button onClick={() => navigate(`/search/${q}/page/${pageNo+1}`)} disabled={pageNo === totalPages} className="w-12 h-12 flex items-center justify-center rounded-xl text-white bg-white/5 hover:bg-red-600 disabled:opacity-20 transition-all"><ChevronRight /></button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center border-t border-white/5">
              <p className="font-manrope font-bold text-white/70 text-4xl md:text-7xl uppercase italic tracking-tighter">Enter keywords to begin</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Search;