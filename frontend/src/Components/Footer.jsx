import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-white/70 hover:text-white transition-all group"
      >
        <span className="font-manrope font-bold text-xs uppercase tracking-wider">{title}</span>
        <span className={`text-xl transition-transform duration-500 ${isOpen ? 'rotate-45 text-red-600' : 'rotate-0'}`}>+</span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out px-2 font-nunito text-sm leading-relaxed ${
          isOpen ? 'max-h-[300px] pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="text-white/70 border-l-2 border-red-600 pl-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, link) => {
    e.preventDefault();
    navigate(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="w-full bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4 space-y-8">
            <img src={Logo} alt="Logo" className="h-10 md:h-12 object-contain" />
            <p className="font-nunito text-white/70 text-sm leading-relaxed max-w-sm">
              Experience cinema like never before. <span className="text-white font-bold">THE THEATER</span> is your curated gateway to global storytelling, trending hits, and timeless classics.
            </p>
            <div className="pt-4">
               <Accordion title="Technical Source">
                  <p>Explore the project architecture on 
                    <a href="https://github.com/ThomasAntonyS" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 ml-1 transition-colors underline">GitHub</a>.
                  </p>
               </Accordion>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="font-manrope font-black italic text-2xl uppercase tracking-tighter">Quick Access</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-manrope">
              {quickLinks.map(({ label, to }, i) => (
                <Link
                  key={i}
                  onClick={(e) => handleNavigation(e, to)}
                  className="text-white/70 hover:text-red-600 transition-all text-[10px] font-bold uppercase tracking-wide w-fit"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 space-y-12">
          <div className="space-y-4">
            <h4 className="font-manrope font-black italic text-3xl uppercase tracking-tighter text-white/90">Questions?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <Accordion title="Content Coverage">
                Our database is powered by TMDB, providing real-time access to trailers, cast details, and ratings for millions of titles.
              </Accordion>
              <Accordion title="Personal Watchlist">
                Add any movie to your local session list. No registration required—just click and save.
              </Accordion>
              <Accordion title="Platform Access">
                The Theater is a free-to-use open-source cinematic explorer built for enthusiasts.
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <div className="font-manrope font-bold text-[10px] tracking-wide text-white/70 uppercase">
              &copy; {new Date().getFullYear()} THE THEATER — Engineered for Film
            </div>
            <div className="flex gap-8 font-manrope font-bold text-[10px] tracking-wide text-white/70 uppercase">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">API</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;