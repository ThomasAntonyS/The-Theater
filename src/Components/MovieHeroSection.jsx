import React from 'react';
import PlaceHolderImage from '../assets/placeholder_movie.png'
import { RiMovieLine } from "react-icons/ri";

const MovieHeroSection = ({ item, handleWatchlist }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="relative h-[70vh] sm:h-[90vh] w-screen text-white mb-16 overflow-hidden">
      {/* Image */}
      <img
          src={
          item.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
            : PlaceHolderImage
        }
        alt={item.title}
        className={`absolute inset-0 h-max sm:h-full w-full sm:object-cover ${item.backdrop_path?"sm:object-top":"sm:object-center"} sm:aspect-auto mt-[10vh] sm:mt-0`}
      />


      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />

      {/* Content */}
      <div className="absolute bottom-5 w-full z-10 flex flex-col px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col sm:justify-between gap-4">
            <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow text-left">
              {item.original_title || item.title}
            </h2>
            <h3 className=" text-[1.2rem] font-nunito line-clamp-2">{item.overview}</h3>
          </div>
        </div>

        <div className="mt-5 py-4 text-gray-300 text-sm rounded-md">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-wrap text-[1.1rem] align-middle gap-4 font-nunito">
              <p className="h-max my-auto">
                <span className="text-red-500 font-semibold">Release Date:</span>{' '}
                {formatDate(item.release_date)}
              </p>
              <p className="h-max my-auto">
                <span className="text-red-500 font-semibold">Rating:</span>{' '}
                <span className="text-yellow-400">{item.vote_average?.toFixed(1)}</span>
              </p>
            </div>

            <button
              onClick={handleWatchlist}
              title='Add to your watchlist'
              className="flex h-max w-max my-auto bg-red-600 hover:bg-red-700 font-nunito text-white px-4 py-2 rounded-md text-sm sm:text-base sm:w-auto"
            >
              <span className='h-max my-auto mx-2'><RiMovieLine size={23} /></span>Add to Watchlist 
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHeroSection;
