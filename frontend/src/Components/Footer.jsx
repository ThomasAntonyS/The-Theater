import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ExploreIcon from '@mui/icons-material/Explore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Footer = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const handleNavigation = (e, link) => {
    e.preventDefault();
    navigate(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAccordion = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const navigationColumns = [
    {
      title: "Discover",
      icon: <ExploreIcon className="text-red-600 text-sm" />,
      links: [
        { label: 'Home', to: '/' },
        { label: 'Discover Movies', to: '/discover/page/1' },
        { label: 'Advanced Search', to: '/search' },
        { label: 'Watchlist', to: '/watchlist' }
      ]
    },
    {
      title: "Explore",
      icon: <LocalMoviesIcon className="text-red-600 text-sm" />,
      links: [
        { label: 'Popular', to: '/popular/page/1' },
        { label: 'Trending Today', to: '/trending/page/1' },
        { label: 'Top Rated', to: '/top_rated/page/1' },
        { label: 'Upcoming', to: '/upcoming/page/1' }
      ]
    }
  ];

  const faqItems = [
    {
      title: "Content Coverage",
      content: "Our database is powered by TMDB, providing real-time access to trailers, cast details, and ratings for millions of titles."
    },
    {
      title: "Personal Watchlist",
      content: "Add any movie to your local session list. No registration required—just click and save."
    },
    {
      title: "Platform Access",
      content: "The Theater is a free-to-use open-source cinematic explorer built for enthusiasts."
    }
  ];

  return (
    <footer className="w-full bg-[#050505] text-white pt-16 pb-10 border-t border-white/5 font-nunito">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* TOP SECTION: Branding, Navigation Columns, & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Info & Social/Source Link */}
          <div className="lg:col-span-4 space-y-6">
            <img src={Logo} alt="Logo" className="h-10 md:h-12 object-contain" />
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Experience cinema like never before. <span className="text-white font-bold">THE THEATER</span> is your curated gateway to global storytelling, trending hits, and timeless classics.
            </p>
            <div className="pt-2">
              <a 
                href="https://github.com/ThomasAntonyS" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 text-xs font-manrope font-bold uppercase tracking-wider transition-all group"
              >
                <GitHubIcon fontSize="small" className="text-white/70 group-hover:text-red-600 transition-colors" />
                <span>Explore Architecture on GitHub</span>
              </a>
            </div>
          </div>

          {/* Dynamic Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {navigationColumns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2">
                  {col.icon}
                  <h4 className="font-manrope font-black italic text-base uppercase tracking-wider text-white">
                    {col.title}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.to}
                        onClick={(e) => handleNavigation(e, link.to)}
                        className="text-white/60 hover:text-red-600 transition-colors text-xs font-manrope font-bold uppercase tracking-wide block w-fit"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Interactive Accordion FAQs for Quick Answers */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <HelpOutlineIcon className="text-red-600 text-sm" />
              <h4 className="font-manrope font-black italic text-base uppercase tracking-wider text-white">
                Frequently Asked
              </h4>
            </div>
            
            <div className="space-y-2">
              {faqItems.map((faq, index) => {
                const isOpen = openSection === index;
                return (
                  <div key={index} className="border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden transition-all">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center px-4 py-3 text-left text-white/80 hover:text-white transition-colors"
                    >
                      <span className="font-manrope font-bold text-xs uppercase tracking-wider">{faq.title}</span>
                      <span className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-45 text-red-600' : 'rotate-0'}`}>+</span>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out px-4 text-xs text-white/70 leading-relaxed ${
                        isOpen ? 'max-h-[200px] pb-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="border-l-2 border-red-600 pl-3">
                        {faq.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: Copyright & Legal Links */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-[10px] font-manrope font-bold tracking-widest uppercase">
          <div>
            &copy; {new Date().getFullYear()} THE THEATER — Engineered for Film
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">TMDB API</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;