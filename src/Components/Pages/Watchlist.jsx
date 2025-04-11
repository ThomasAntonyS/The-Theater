import React, { useContext } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../Context/ProfileContextProvider';

const Watchlist = () => {
  const { loggedIn, userWatchlist, setUserWatchlist } = useContext(ProfileContext);

  // Remove movie from watchlist
  const handleRemove = (movieId) => {
    const updatedList = userWatchlist.filter(movie => movie.id !== movieId);
    setUserWatchlist(updatedList);
  };

  return (
    <>
      <Header />

      <div className='Watchlist_Container text-white min-h-screen bg-black px-4 py-8 mb-[10vh]'>
        {
          loggedIn ? (
            userWatchlist.length > 0 ? (
              <>
                <section className='max-w-screen-xl mx-auto my-[15vh]'>
                  <h1 className='text-3xl md:text-4xl font-bold mb-4'>Your Watchlist</h1>
                  <p className='text-sm md:text-base text-gray-300 mb-8'>
                    Add movies to your watchlist and keep track of films you want to see. Conveniently save titles to enjoy later, so you never forget a movie recommendation or new release. Enjoy seamless access whenever you're ready to watch.
                  </p>

                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {userWatchlist.map((movie) => (
                      <div key={movie.id} className='relative group'>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className='w-full h-auto rounded-lg shadow-lg object-cover'
                        />
                        <div className='absolute top-2 right-2'>
                          <button
                            onClick={() => handleRemove(movie.id)}
                            className='bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition'
                          >
                            Remove
                          </button>
                        </div>
                        <div className='mt-2 text-center'>
                          <h3 className='text-sm font-semibold'>{movie.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <Footer />
              </>
            ) : (
              <p className='text-white text-xl text-center mt-32'>Your watchlist is empty. Start adding some movies!</p>
            )
          ) : (
            <div className='flex items-center justify-center min-h-screen text-white'>
              <Link
                to='/sign_in'
                className='px-6 py-3 border border-white rounded bg-white bg-opacity-10 hover:bg-opacity-20 transition'
              >
                Click here to Sign In / Sign Up to view your watchlist
              </Link>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Watchlist;
