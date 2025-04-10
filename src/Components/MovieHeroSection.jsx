import React from 'react';

const MovieHeroSection = ({ item, handleWatchlist }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const mockLikes = Math.round(item.popularity * 100) || 2548;
  const mockComments = item.vote_count || 21;
  const mockShares = Math.floor(item.popularity * 10) || 564;

  return (
    <section
      className="relative  h-screen sm:h-[85vh] w-full bg-cover bg-center text-white mb-16"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />

      {/* Parent Container for main and footer */}
      <div className="absolute bottom-5 w-full z-10 flex flex-col px-4 sm:px-6 md:px-12 lg:px-16">
        <div className=" flex flex-col flex-grow">
          <div className="flex flex-col sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow text-left">
              {item.original_title || item.title}
            </h2>
            <h3 className=' truncate'>
                {item.overview}
            </h3>
          </div>
        </div>

        <div className=" mt-5 py-4 text-gray-300 text-sm rounded-md">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-wrap align-middle gap-4">
              <p className=' h-max my-auto'>
                <span className="text-red-500 font-semibold">Published:</span>{' '}
                {formatDate(item.release_date)}
              </p>
              <p className=' h-max my-auto'>
                <span className="text-red-500 font-semibold">Rating:</span>{' '}
                <span className="text-yellow-400">{item.vote_average?.toFixed(1)}</span>
              </p>
            </div>

            <div className="flex gap-6 flex-wrap text-sm">
              <p className=' h-max my-auto'>❤️ {mockLikes.toLocaleString()}</p>
              <p className=' h-max my-auto'>💬 {mockComments.toLocaleString()}</p>
              <p className=' h-max my-auto'>🔁 {mockShares.toLocaleString()}</p>
            </div>
            <button
              onClick={handleWatchlist}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHeroSection;
