import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from '../assets/Logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div>
      <div className="fixed font-manrope top-0 flex items-center justify-between h-[10vh] w-full bg-black bg-opacity-50 backdrop-blur-md z-[100] px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center h-full text-white font-bold">
          <Link to="/" onClick={scrollToTop} className="h-full flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-[60%] object-contain"
            />
          </Link>
        </div>

        <div className="hidden ml-[7%] md:flex gap-4 lg:gap-8 text-white text-base lg:text-[1.2rem] items-center">
          <Link
            className="hover:opacity-70 hover:underline"
            to="/popular/page/1"
            onClick={scrollToTop}
            title='Popular Movies'
          >
            Popular
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            className="hover:opacity-70 hover:underline"
            to="/top_rated/page/1"
            onClick={scrollToTop}
            title='Top Rated Movies'
          >
            Top-Rated
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            className="hover:opacity-70 hover:underline"
            to="/trending/page/1"
            onClick={scrollToTop}
            title='Trending Movies'
          >
            Trending
          </Link>
        </div>

        <div className="flex items-center text-white">
          <div className="hidden md:flex gap-x-2">
            <Link
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
              to="/search"
              onClick={scrollToTop}
              title='Search'
            >
              <p className=' h-max my-auto flex flex-row-reverse gap-x-1'>Search <span><SearchIcon style={{ marginTop: "-3px" }} /></span></p>
            </Link>

            <Link
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
              to="/watchlist"
              onClick={scrollToTop}
              title='Watchlist'
            >
              <p className=' h-max my-auto flex flex-row-reverse gap-x-2'>WatchList <span><LiveTvIcon style={{ marginTop: "-5px" }} /></span></p>
            </Link>
          </div>

          {/* Mobile: Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md bg-black/80 hover:bg-black ">
              Explore {(menuOpen)? <KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed font-manrope top-[10vh] left-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-[90] flex flex-col items-center text-white py-4 gap-4 md:hidden">
          <Link to="/" onClick={scrollToTop} className="hover:underline text-lg">Home</Link>
          <Link to="/popular/page/1" onClick={scrollToTop} className="hover:underline text-lg">Popular</Link>
          <Link to="/top_rated/page/1" onClick={scrollToTop} className="hover:underline text-lg">Top-Rated</Link>
          <Link to="/upcoming/page/1" onClick={scrollToTop} className="hover:underline text-lg">Upcoming</Link>
          <Link to="/trending/page/1" onClick={scrollToTop} className="hover:underline text-lg">Trending</Link>
          <Link to="/search" onClick={scrollToTop} className="hover:underline text-lg flex items-center gap-x-1">
            <SearchIcon fontSize="small" /> Search
          </Link>
          <Link to="/watchlist" onClick={scrollToTop} className="hover:underline text-lg flex items-center gap-x-1">
            <LiveTvIcon fontSize="small" /> Watchlist
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
