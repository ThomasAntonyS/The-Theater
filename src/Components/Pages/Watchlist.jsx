import React, { useContext } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../Context/ProfileContextProvider';

const Watchlist = () => {
  const {userWatchlist, setUserWatchlist } = useContext(ProfileContext);

  const handleRemove = (movieName,movieId) => {
    const promptVal = prompt(`Type "ok" to remove: ${movieName}`)
    if(promptVal=="ok"){
      const updatedList = userWatchlist.filter(movie => movie.id !== movieId);
      setUserWatchlist(updatedList);
    }
    else return;
  };

  return (
    <>
      <Header />

      <div className='Watchlist_Container text-white min-h-screen bg-black'>
        {
            userWatchlist.length > 0 ? (
              <>
                <section className='max-w-screen-xl mx-auto my-[15vh] px-4'>
                  <h1 className='text-3xl md:text-4xl text-center sm:text-left font-semibold mb-4 font-manrope'>Your Watchlist</h1>
                  <p className='text-sm md:text-base text-gray-300 mb-8 font-nunito'>
                    Add movies to your watchlist and keep track of films you want to see. Conveniently save titles to enjoy later, so you never forget a movie recommendation or new release. Enjoy seamless access whenever you're ready to watch.
                  </p>

                  <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {userWatchlist.map((movie) => (
                      <div key={movie.id} className='relative group'>
                        <Link to={`/movie/${movie.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className='w-full h-auto rounded-lg shadow-lg object-cover'
                          />
                          <div className='mt-2 text-center'>
                            <h3 className='text-[1.2rem] font-semibold font-nunito my-2 truncate'>{movie.title}</h3>
                          </div>
                        </Link>
                        <div className=' w-full'>
                          <button
                            onClick={() => handleRemove(movie.title,movie.id)}
                            className='bg-white text-black font-bold font-nunito w-full text-[1.3rem] text-xs px-2 py-3 rounded hover:bg-white/50 transition my-2'
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <Footer />
              </>
            ) : (
              <p className='text-white text-xl text-center mt-32 font-nunito my-[15vh]'>Your watchlist is empty. Start adding some movies!</p>
            )
        }
      </div>
    </>
  );
};

export default Watchlist;
