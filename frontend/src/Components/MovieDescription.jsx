import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';

const MovieDescription = ({ item }) => {
  const [showAllStudios, setShowAllStudios] = useState(false);

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
    belongs_to_collection,
    credits
  } = item;

  const imageUrl = `https://image.tmdb.org/t/p/w780${poster_path}`;
  const country = production_countries?.map((c) => c.name).join(', ') || 'N/A';
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const language = spoken_languages?.map((l) => l.english_name).join(', ') || 'N/A';
  const director = credits?.crew?.find(person => person.job === "Director");

  const studioLimit = 3;
  const companiesWithLogos = production_companies?.filter(c => c.logo_path) || [];
  const visibleStudios = companiesWithLogos.slice(0, studioLimit);
  const extraStudios = companiesWithLogos.slice(studioLimit);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full px-6 md:px-12 bg-transparent text-white overflow-hidden py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
        
        <div className="hidden lg:block w-[400px] flex-shrink-0" data-aos="zoom-out" data-aos-duration="1200">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10">
              {poster_path ? (
                <img src={imageUrl} alt={title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="aspect-[2/3] flex items-center justify-center bg-zinc-900 text-6xl">🎬</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <header className="space-y-4 border-l-4 border-red-600 pl-6 md:pl-10">
            <div className="flex flex-wrap items-center gap-4 text-xs font-manrope font-black tracking-[0.1em] text-white/70 uppercase">
              <span>{year}</span>
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              <span className="flex items-center gap-1"><AccessTimeIcon sx={{ fontSize: 14 }} /> {runtime} MIN</span>
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              <span className="flex items-center gap-1 text-yellow-500"><StarIcon sx={{ fontSize: 14 }} /> {vote_average?.toFixed(1)}</span>
            </div>
            
            <h1
              style={{ textWrap: 'balance' }}
              className="font-manrope font-black italic uppercase tracking-tighter transition-all duration-500 leading-[0.9] text-4xl md:text-5xl lg:text-7xl"
            >
              {title}
            </h1>
            
            {tagline && (
              <p className="text-xl md:text-2xl font-nunito font-light text-white/70 italic tracking-wide pt-2">
                "{tagline}"
              </p>
            )}

            {director && (
              <div className="pt-2">
                <p className="text-[10px] font-manrope font-black text-white uppercase tracking-[0.1em] mb-1">Directed By -</p>
                <Link 
                  to={`/cast/${director.id}/director`}
                  onClick={handleScrollTop}
                  className="group inline-flex flex-col text-xl md:text-2xl font-manrope font-black italic uppercase transition-colors"
                >
                  <span className="flex gap-2">
                    <span>{director.name.split(" ")[0]}</span>
                    {director.name.split(" ").length > 1 && (
                      <span className="text-red-600">{director.name.split(" ").slice(1).join(" ")}</span>
                    )}
                  </span>
                  <span className="h-0.5 w-0 bg-red-600 mt-1 transition-all duration-500 group-hover:w-[70%]" />
                </Link>
              </div>
            )}
          </header>

          <div className="space-y-6">
            <p className="text-lg md:text-xl text-white/70 font-nunito leading-relaxed max-w-4xl text-justify">
              {overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {genres?.map((genre) => (
                <Link 
                  key={genre.id} 
                  to={`/genre/${genre.id}/page/1`}
                  onClick={handleScrollTop}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 font-manrope font-bold text-[10px] uppercase tracking-wide hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>

          <hr className="border-white/5" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <PublicIcon className="text-red-600" />
                <div>
                  <p className="text-[10px] font-manrope font-black text-white/70 uppercase tracking-[0.1em]">Production Origin</p>
                  <p className="text-sm font-nunito font-bold">{country}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-manrope font-black text-white/70 uppercase tracking-[0.1em]">Available Languages</p>
                <p className="text-sm font-nunito font-bold">{language}</p>
              </div>
            </div>

            {belongs_to_collection && (
              <Link 
                to={`/collection/${belongs_to_collection.id}`}
                onClick={handleScrollTop}
                className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                <p className="text-[10px] font-manrope font-black text-red-600 uppercase tracking-[0.1em] mb-1">Part of a Series</p>
                <p className="text-lg font-manrope font-black italic uppercase group-hover:translate-x-2 transition-transform">{belongs_to_collection.name} &rarr;</p>
              </Link>
            )}
          </div>

          {companiesWithLogos.length > 0 && (
            <div className="pt-8">
              <p className="text-[10px] font-manrope font-black text-white/70 uppercase tracking-[0.1em] mb-6">Studio Partners</p>
              <div className="flex flex-wrap gap-8 items-center transition-all">
                {visibleStudios.map((company) => (
                  <img
                    key={company.id}
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-7 md:h-9 object-contain invert opacity-70 hover:opacity-100 transition-opacity"
                  />
                ))}
                
                {!showAllStudios && extraStudios.length > 0 && (
                  <button 
                    onClick={() => setShowAllStudios(true)}
                    className="text-[10px] font-manrope font-black text-red-600 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    + {extraStudios.length} More
                  </button>
                )}
              </div>

              {showAllStudios && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
                  {extraStudios.map((company) => (
                    <span key={company.id} className="text-[11px] font-manrope font-bold text-white/60 uppercase tracking-tight">
                      {company.name}
                    </span>
                  ))}
                  <button 
                    onClick={() => setShowAllStudios(false)}
                    className="text-[10px] font-manrope font-black text-red-600 uppercase tracking-wide underline"
                  >
                    Show Less
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDescription;