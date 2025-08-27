import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Logo from '../assets/Logo.png';

const Header = () => {

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

        <div className="hidden md:flex gap-4 lg:gap-8 text-white text-base lg:text-[1.2rem] items-center ml-[7%]">
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

        <div className="flex gap-x-2 items-center text-white">
          <Link
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
            to="/search"
            onClick={scrollToTop}
            title='Search'
          >
            <p className=' h-max my-auto flex flex-row-reverse gap-x-1'>Search <span><SearchIcon style={{marginTop:"-3px"}}/></span></p>
          </Link>

          <Link
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 transition-colors duration-200 text-base sm:text-lg"
            to="/watchlist"
            onClick={scrollToTop}
            title='Watchlist'
          >
            <p className=' h-max my-auto flex flex-row-reverse gap-x-2'>WatchList <span><LiveTvIcon style={{marginTop:"-5px"}}/></span></p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Header;