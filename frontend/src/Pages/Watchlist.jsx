import React, { useContext, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../Context/ProfileContextProvider';
import { FaExclamationTriangle } from 'react-icons/fa';
import StarIcon from '@mui/icons-material/Star';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const Watchlist = () => {
  const { userWatchlist, setUserWatchlist } = useContext(ProfileContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  document.title = "The Theater | Watchlist"

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

  const baseImage = 'https://image.tmdb.org/t/p/w185';

  return (
    <>
      <Header />

      <div className="text-white min-h-screen bg-black relative">
        {userWatchlist.length > 0 ? (
          <section className="w-[90%] mx-auto max-w-screen-xl py-20">
            <h1 className="text-7xl sm:text-9xl text-center mx-auto my-[10vh] font-manrope">
              Your Watchlist
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {userWatchlist.map((movie) => (
                <div key={movie.id} className="relative flex flex-col">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="relative w-full overflow-hidden rounded-md hover:cursor-pointer"
                  >

                    <div className="absolute top-0 right-0 bg-black font-manrope bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 rounded-b-sm flex items-center gap-1 z-10">
                      <StarIcon style={{ fontSize: '1rem' }} />
                      <p className="h-max my-auto">{movie.vote_average.toFixed(1)}</p>
                    </div>

                    {movie.poster_path ? (
                      <img
                        src={baseImage + movie.poster_path}
                        alt={movie.title}
                        className="aspect-[2/3] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[2/3] w-full flex items-center justify-center bg-gray-800 rounded-[10px]">
                        <MovieCreationIcon style={{ fontSize: "3rem", color: "white" }} />
                      </div>
                    )}

                    <p className="absolute w-full bottom-0 backdrop-blur-md bg-black/70 px-3 py-1 text-white text-[1.1rem] text-center truncate font-nunito object-cover">
                      {movie.title}
                    </p>
                  </Link>

                  <button
                    onClick={() => openModal(movie)}
                    className="bg-white text-black font-bold font-nunito w-full text-xs sm:text-sm px-2 py-2 sm:py-2 rounded hover:bg-white/80 transition mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
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
