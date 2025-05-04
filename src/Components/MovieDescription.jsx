import React from 'react';

const MovieDescription = ({ item }) => {
  if (!item) return null;

  const {
    title,
    overview,
    poster_path,
    production_countries,
    genres,
    release_date,
    tagline,
    spoken_languages,
    runtime,
    vote_average,
    production_companies,
  } = item;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const country = production_countries?.map((c) => c.name).join(', ') || 'N/A';
  const genre = genres?.map((g) => g.name).join(', ') || 'N/A';
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const language = spoken_languages?.map((l) => l.english_name).join(', ') || 'N/A';

  return (
    <div className="px-4 md:px-12 py-10 text-white bg-black w-full" data-aos="fade-right" data-aos-duration="1000">
      <div className="max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="w-full md:w-1/3 my-auto">
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="overflow-x-hidden flex-1 text-left my-auto" data-aos="fade-in" data-aos-duration="1000">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-manrope">{title}</h2>

          {tagline && (
            <p className="text-lg text-gray-400 italic mb-4 font-nunito">"{tagline}"</p>
          )}

          <p className="text-base md:text-lg text-gray-300 mb-6 font-nunito line-clamp-5">{overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base text-gray-300 font-manrope">
            <p>
              <span className="font-semibold text-white">Country:</span> {country}
            </p>
            <p>
              <span className="font-semibold text-white">Genre:</span> {genre}
            </p>
            <p>
              <span className="font-semibold text-white">Year:</span> {year}
            </p>
            <p>
              <span className="font-semibold text-white">Language:</span> {language}
            </p>
            <p>
              <span className="font-semibold text-white">Duration:</span> {runtime} min
            </p>
            <p>
              <span className="font-semibold text-white">Rating:</span> ⭐ {vote_average}
            </p>
          </div>

          {/* Production Companies */}
          {production_companies?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-2 font-manrope">Production Companies:</h3>
              <div className="flex flex-wrap gap-4 items-center">
                {production_companies.map((company) =>
                  company.logo_path ? (
                    <img
                      key={company.id}
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      title={company.name}
                      className="h-10 object-contain bg-white/70 rounded-md p-1"
                    />
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
