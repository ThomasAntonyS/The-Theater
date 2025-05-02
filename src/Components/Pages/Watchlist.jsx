import React, { useContext, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../Context/ProfileContextProvider';
import { FaExclamationTriangle } from 'react-icons/fa';

const Watchlist = () => {
  const { userWatchlist, setUserWatchlist } = useContext(ProfileContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  return (
    <>
      <Header />

      <div className=" text-white min-h-screen bg-black relative mt-[5vh]">
        {userWatchlist.length > 0 ? (
          <>
            <section className="max-w-screen-xl mx-auto py-20 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-center sm:text-left font-semibold mb-4 font-manrope">
                Your Watchlist
              </h1>
              <p className="text-sm md:text-base text-gray-300 mb-8 font-nunito max-w-3xl">
                Add movies to your watchlist and keep track of films you want to see. Conveniently save titles to enjoy later, so you never forget a movie recommendation or new release.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {userWatchlist.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-lg shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="mt-2 text-center">
                        <h3 className="text-sm sm:text-base font-semibold font-nunito truncate">
                          {movie.title}
                        </h3>
                      </div>
                    </Link>
                    <button
                      onClick={() => openModal(movie)}
                      className="bg-white text-black font-bold font-nunito w-full text-xs sm:text-sm px-2 py-2 sm:py-3 rounded hover:bg-white/50 transition mt-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-white text-lg sm:text-2xl text-center font-nunito px-4">
              Your watchlist is empty. Start adding some movies!
            </p>
          </div>
        )}
        <Footer />

        {/* Delete Confirmation Modal */}
        {showModal && selectedMovie && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white text-black rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-6 relative">
            <button
              className="absolute font-manrope top-2 right-4 text-4xl font-extrabold text-gray-700 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>


              <div className="flex flex-col items-center text-center mt-5">
                <FaExclamationTriangle className="text-red-500 text-4xl mb-3" />
                <h2 className="text-[1.5rem] font-bold mb-4 font-manrope">Remove Movie</h2>
                <p className="mb-6 text-[1.2rem] font-nunito">
                  Do you want to remove <span className="font-bold">"{selectedMovie.title}"</span> from your watchlist?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-manrope font-bold w-full sm:w-auto"
                    onClick={confirmRemove}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded font-manrope font-bold w-full sm:w-auto"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Watchlist;
