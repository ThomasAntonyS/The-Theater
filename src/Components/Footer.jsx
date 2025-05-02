import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'; 

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

  return (
    <footer data-aos="fade-bottom" data-aos-duration="1000" className="w-full bg-[#151515] text-white font-nunito">
      <div className="flex flex-col sm:flex-row items-center justify-between w-[90%] gap-8 sm:py-11 mx-auto py-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <img src={Logo} alt="Logo" className="h-[4vh] sm:h-[4vh]" />
        </div>

        {/* Subscribe section */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subscribe for new updates"
            className="px-4 py-2 rounded-md bg-[#262626] border border-gray-600 focus:outline-none text-white w-[250px]"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition text-white"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-4 border-t border-white w-[90%] mx-auto">
        {[
          { label: 'Home', to: '/' },
          { label: 'Popular', to: '/popular' },
          { label: 'Top Rated', to: '/top_rated' },
          { label: 'Upcoming', to: '/upcoming' },
          { label: 'Sign Up', to: '/sign_up' },
          { label: 'Sign In', to: '/sign_in' },
          { label: 'WatchList', to: '/watchlist' },
        ].map(({ label, to }, i) => (
          <Link
            key={i}
            onClick={(e) => handleNavigation(e, to)}
            className="hover:opacity-75 transition"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 py-4">
        &copy; {new Date().getFullYear()} THE THEATER - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
