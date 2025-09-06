import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border border-gray-600 rounded-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 bg-[#262626] text-sm text-white font-medium hover:bg-[#333] transition"
      >
        {title}
        <span className="text-lg transition-transform duration-300">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out px-4 bg-[#1e1e1e] text-sm ${
          isOpen ? 'max-h-[300px] py-3 opacity-100' : 'max-h-0 opacity-0 overflow-hidden py-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNavigation = (e, link) => {
    e.preventDefault();
    navigate(link);
    window.scrollTo(0, 0);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Search', to: '/search' },    
    { label: 'Popular', to: '/popular/page/1' },
    { label: 'Trending', to: '/trending/page/1' },  
    { label: 'Top Rated', to: '/top_rated/page/1' },
    { label: 'Upcoming', to: '/upcoming/page/1' },
    { label: 'WatchList', to: '/watchlist' },
    { label: 'Sign Up', to: '/sign_up' },
    { label: 'Sign In', to: '/sign_in' },
  ];

  return (
    <footer className="w-full bg-[#151515] text-white font-nunito mt-[10vh]" data-aos="fade-up" data-aos-duration="1000">
      <div className="w-[90%] mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        <div className="flex flex-col gap-4">
          <img src={Logo} alt="Logo" className="h-[7vh] w-[7vh]" />
          <p className="text-sm text-gray-400 leading-relaxed">
            Dive into the world of movies with <span className="font-semibold">The Theater</span>. Stay updated on the latest hits, cult classics, and hidden gems.
          </p>
          
          <Accordion title="Want to see the source code?">
            <p className="text-sm text-left text-gray-400">
              <a
                href="https://github.com/ThomasAntonyS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                GitHub
              </a>
            </p>
          </Accordion>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold mb-1">Quick Links</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {quickLinks.map(({ label, to }, i) => (
              <Link
                key={i}
                onClick={(e) => handleNavigation(e, to)}
                className="hover:text-red-500 transition text-sm text-gray-300 w-fit"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Newsletter</h4>
          <p className="text-sm text-gray-400">Subscribe to get the latest movie updates.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md bg-[#262626] border border-gray-600 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition text-white w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-10">
        <h4 className="text-lg font-semibold mb-4">FAQs</h4>
        <div className="flex flex-col gap-3">
          <Accordion title="What kind of movie information can I explore here?">
            <p className="text-sm text-left text-gray-400">
              You can browse movies with detailed info like title, release date, ratings, genres, cast, trailers, and related movies — all fetched from TMDB.
            </p>
          </Accordion>

          <Accordion title="Can I create a watchlist or favorite movies?">
            <p className="text-sm text-left text-gray-400">
              Absolutely! Add your favorite movies to a watchlist and revisit them any time. Just click the watchlist icon!
            </p>
          </Accordion>

          <Accordion title="Do I need an account to use this platform?">
            <p className="text-sm text-left text-gray-400">
              No account is required. You can explore movies, check ratings, and manage a watchlist without logging in.
            </p>
          </Accordion>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10">
        <div className="w-[90%] mx-auto py-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} THE THEATER — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
