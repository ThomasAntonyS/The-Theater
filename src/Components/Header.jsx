import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
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
    setUserName(' ');
    setUserEmail(' ');
    setUserWatchlist([]);
    if (loggedIn) {
      alert('Logout Successful');
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
  };

  return (
    <div>
      <div className="fixed font-manrope top-0 flex align-middle justify-between h-[10vh] w-[100vw] overflow-x-hidden bg-black bg-opacity-50 backdrop-blur-md z-[100] px-4">
        <div className="hidden lg:flex gap-2 text-white">
          <Link
            className="h-max w-max my-auto hover:opacity-70 hover:underline"
            to="/popular"
            onClick={scrollToTop}
            title='Popular Movies'
          >
            Popular
          </Link>
          <span className="h-max my-auto">|</span>
          <Link
            className="h-max w-max my-auto hover:opacity-70 hover:underline"
            to="/top_rated"
            onClick={scrollToTop}
            title='Top Rated Movies'
          >
            Top-Rated
          </Link>
          <span className="h-max my-auto">|</span>
          <Link
            className="h-max w-max my-auto hover:opacity-70 hover:underline"
            to="/upcoming"
            onClick={scrollToTop}
            title='Upcoming Movies'
          >
            Upcoming
          </Link>
        </div>

        <div className=" flex align-middle h-max my-auto text-white font-bold">
          <a href="/" onClick={scrollToTop}>
            <img
              src={Logo}
              alt="Logo"
              className=" h-[2vh] lg:h-[4vh] lg:-mx-6 "
            />
          </a>
        </div>

        <div className=" flex text-white">
          <Link
            className="h-max w-max my-auto p-2 rounded-full hover:bg-white hover:bg-opacity-25"
            to="/search"
            onClick={scrollToTop}
          >
            {window.screen.width < 640 ? (
              <SearchIcon fontSize="small" titleAccess='Search' />
            ) : (
              <SearchIcon titleAccess='Search'/>
            )}
          </Link>

          <Link
            className="h-max w-max my-auto p-2 rounded-full  hover:bg-white hover:bg-opacity-25"
            to="/watchlist"
            onClick={scrollToTop}
          >
            {window.screen.width < 640 ? (
              <LiveTvIcon fontSize="small" titleAccess='Watchlist'/>
            ) : (
              <LiveTvIcon titleAccess='Watchlist'/>
            )}
          </Link>

          <div className="LogIn_Out_section flex flex-row align-middle h-max my-auto">
            <Link
              className="h-max w-max my-auto p-2 rounded-full  hover:bg-white hover:bg-opacity-25"
              to="/sign_up"
              onClick={scrollToTop}
            >
              {window.screen.width < 640 ? (
                <LoginIcon fontSize="small" titleAccess='Log-In'/>
              ) : (
                <LoginIcon titleAccess='Log-In'/>
              )}
            </Link>

            <p className=" w-max h-max my-auto">|</p>

            <button
              className="h-max w-max my-auto p-2 rounded-full  hover:bg-white hover:bg-opacity-25"
              onClick={() => {
                handleLogout();
                scrollToTop();
              }}
            >
              {window.screen.width < 640 ? (
                <LogoutIcon fontSize="small" titleAccess='Log-Out'/>
              ) : (
                <LogoutIcon titleAccess='Log-Out'/>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;