import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';

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
    belongs_to_collection
  } = item;

  const imageUrl = `https://image.tmdb.org/t/p/w780${poster_path}`;
  const country = production_countries?.map((c) => c.name).join(', ') || 'N/A';
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const language = spoken_languages?.map((l) => l.english_name).join(', ') || 'N/A';

  const handleGenreClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-16 px-6 md:px-12 bg-transparent text-white overflow-hidden">
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
              className="font-manrope font-black italic uppercase tracking-tighter transition-all duration-500 leading-[0.9] text-4xl md:text-5xl lg:text-6xl"
            >
              {title}
            </h1>
            
            {tagline && (
              <p className="text-xl md:text-2xl font-nunito font-light text-white/70 italic tracking-wide">
                "{tagline}"
              </p>
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
                  onClick={handleGenreClick}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 font-manrope font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all duration-300"
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
                onClick={handleGenreClick}
                className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                <p className="text-[10px] font-manrope font-black text-red-600 uppercase tracking-[0.2em] mb-1">Part of a Series</p>
                <p className="text-lg font-manrope font-black italic uppercase group-hover:translate-x-2 transition-transform">{belongs_to_collection.name} &rarr;</p>
              </Link>
            )}
          </div>

          {production_companies?.some(c => c.logo_path) && (
            <div className="pt-8">
              <p className="text-[10px] font-manrope font-black text-white/70 uppercase tracking-[0.1em] mb-6">Studio Partners</p>
              <div className="flex flex-wrap gap-8 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                {production_companies.map((company) =>
                  company.logo_path ? (
                    <img
                      key={company.id}
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-8 md:h-10 object-contain invert"
                    />
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDescription;