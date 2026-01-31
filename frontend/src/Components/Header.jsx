import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from '../assets/Logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { name: 'Popular', path: '/popular/page/1' },
    { name: 'Top-Rated', path: '/top_rated/page/1' },
    { name: 'Trending', path: '/trending/page/1' },
    { name: 'Upcoming', path: '/upcoming/page/1' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 font-manrope px-4 py-3 md:px-12 md:py-4 flex items-center justify-between ${
      scrolled ? 'bg-black/40 backdrop-blur-2xl shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="flex items-center gap-6 lg:gap-12">
        <Link to="/" onClick={scrollToTop} className="transition-transform active:scale-95 shrink-0">
          <img src={Logo} alt="Logo" className="h-10 object-contain" />
        </Link>
        
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={scrollToTop}
              className="text-[10px] lg:text-xs font-bold italic text-white/70 hover:text-white uppercase tracking-wider transition-all whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/search" onClick={scrollToTop} className="p-2 md:p-2.5 text-white hover:text-white bg-white/20 hover:bg-white/10 rounded-xl transition-all">
          <SearchIcon fontSize="small" />
        </Link>
        
        <Link to="/watchlist" onClick={scrollToTop} className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold tracking-tighter hover:bg-red-600 hover:text-white transition-all">
          <LiveTvIcon fontSize="small" className="scale-75 md:scale-100" />
          WATCHLIST
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white bg-white/20 rounded-xl font-manrope text-sm flex items-center gap-1 px-3">
          MENU {menuOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
        </button>
      </div>

      <div className={`absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-t border-white/5 flex flex-col p-8 gap-6 md:hidden transition-all duration-500 origin-top font-manrope ${
        menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <Link to="/" onClick={scrollToTop} className="text-3xl font-bold text-white/70 hover:text-white transition-colors lowercase italic tracking-tighter">Home</Link>
        {navLinks.map(link => (
          <Link key={link.name} to={link.path} onClick={scrollToTop} className="text-3xl font-bold text-white/30 hover:text-white transition-colors lowercase italic tracking-tighter">{link.name}</Link>
        ))}
        <div className="h-[1px] w-full bg-white/10 my-2" />
        <Link to="/search" onClick={scrollToTop} className="flex items-center justify-center gap-2 w-full py-4 text-white/70 font-bold rounded-2xl text-lg italic border border-white/10">
           <SearchIcon /> SEARCH
        </Link>
        <Link to="/watchlist" onClick={scrollToTop} className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-2xl text-lg italic">
           <LiveTvIcon /> WATCHLIST
        </Link>
      </div>
    </nav>
  );
};

export default Header;