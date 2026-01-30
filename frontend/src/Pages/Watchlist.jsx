import React, { useContext, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../Context/ProfileContextProvider';
import { FaExclamationTriangle } from 'react-icons/fa';
import StarIcon from '@mui/icons-material/Star';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CloseIcon from '@mui/icons-material/Close';

const Watchlist = () => {
  const { userWatchlist, setUserWatchlist } = useContext(ProfileContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  document.title = "Watchlist — The Theater";

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const confirmRemove = () => {
    const updatedList = userWatchlist.filter(movie => movie.id !== selectedMovie.id);
    setUserWatchlist(updatedList);
    closeModal();
  };

  const baseImage = 'https://image.tmdb.org/t/p/w342';

  return (
    <div className="bg-[#050505] min-h-screen">
      <Header />

      <main className="relative pt-[15vh] pb-20">
        <div className="absolute top-[10vh] left-0 w-full overflow-hidden pointer-events-none select-none">
          <h1 className="text-white/[0.03] text-[12rem] md:text-[20rem] font-manrope font-black italic uppercase tracking-tighter leading-none text-center">
            Watchlist
          </h1>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-manrope font-black italic uppercase tracking-tighter text-white">
              Your <span className="text-red-600">Selection</span>
            </h2>
            <p className="font-nunito text-white/70 text-lg mt-2">
              {userWatchlist.length} movies saved for your next session.
            </p>
          </div>

          {userWatchlist.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {userWatchlist.map((movie) => (
                <div key={movie.id} className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 transition-all duration-500 shadow-2xl">
                  <Link to={`/movie/${movie.id}`} className="block relative aspect-[2/3] overflow-hidden">
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-manrope font-black px-2 py-1 rounded z-20">
                      <StarIcon className="text-yellow-500" style={{ fontSize: '0.9rem' }} />
                      <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>

                    {movie.poster_path ? (
                      <img
                        src={baseImage + movie.poster_path}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <MovieCreationIcon className="text-zinc-700" fontSize="large" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  </Link>

                  <div className="p-4">
                    <p className="text-white font-manrope font-black text-sm italic uppercase tracking-tighter truncate">
                      {movie.title}
                    </p>
                    <button
                      onClick={() => openModal(movie)}
                      className="mt-4 w-full py-2 bg-white/5 hover:bg-red-600/20 hover:text-red-500 border border-white/10 hover:border-red-600/50 text-white/70 font-manrope font-bold text-[10px] uppercase tracking-wide rounded-lg transition-all"
                    >
                      Remove from list
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="font-manrope font-bold text-white/10 text-4xl md:text-6xl uppercase italic tracking-tighter">
                Empty Library
              </p>
              <Link to="/" className="inline-block mt-8 text-red-600 font-manrope font-black uppercase tracking-widest text-xs hover:text-white transition-colors">
                Explore Movies &rarr;
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {showModal && selectedMovie && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl" onClick={closeModal} />
          
          <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-2xl p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={closeModal} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
              <CloseIcon />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-6">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
              
              <h2 className="text-3xl font-manrope font-black italic uppercase tracking-tighter text-white mb-4">
                Remove Movie?
              </h2>
              
              <p className="font-nunito text-white/70 text-lg mb-10">
                Are you sure you want to remove <span className="text-white font-bold italic">"{selectedMovie.title}"</span>? This cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={confirmRemove}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-manrope font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                >
                  Confirm Removal
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-manrope font-black uppercase tracking-widest text-xs border border-white/10 transition-all"
                >
                  Keep Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;