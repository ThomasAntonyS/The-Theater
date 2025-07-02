import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Logo from '../assets/Logo.png';
import { ProfileContext } from '../Context/ProfileContextProvider';

const Header = () => {
  const { setUserName, setUserEmail, setUserWatchlist, setLoggedIn, loggedIn } = useContext(ProfileContext);

  function handleLogout() {
    setLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setUserWatchlist([]);
    if (loggedIn) {
      alert('Logout Successful');
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className="fixed font-manrope top-0 flex items-center justify-between h-[10vh] w-full bg-black bg-opacity-50 backdrop-blur-md z-[100] px-4 sm:px-6 md:px-8">

        <div className="flex items-center h-full text-white font-bold">
          <Link to="/" onClick={scrollToTop} className="h-full flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-[60%] sm:h-[70%] object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex gap-4 lg:gap-8 text-white text-base lg:text-[1.2rem] items-center ml-[13%]">
          <Link
            className="hover:opacity-70 hover:underline"
            to="/popular"
            onClick={scrollToTop}
            title='Popular Movies'
          >
            Popular
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            className="hover:opacity-70 hover:underline"
            to="/top_rated"
            onClick={scrollToTop}
            title='Top Rated Movies'
          >
            Top-Rated
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            className="hover:opacity-70 hover:underline"
            to="/trending"
            onClick={scrollToTop}
            title='Trending Movies'
          >
            Trending
          </Link>
        </div>

        <div className="flex items-center text-white">
          <Link
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
            to="/search"
            onClick={scrollToTop}
            title='Search'
          >
            <SearchIcon />
          </Link>

          <Link
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
            to="/watchlist"
            onClick={scrollToTop}
            title='Watchlist'
          >
            <LiveTvIcon />
          </Link>

          <div className="flex items-center">
            <Link
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
              to="/sign_up"
              onClick={scrollToTop}
              title='Log-In'
            >
              <LoginIcon />
            </Link>

            <p className="text-gray-400 mx-1 sm:mx-2">|</p>

            <button
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
              onClick={() => {
                handleLogout();
                scrollToTop();
              }}
              title='Log-Out'
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;