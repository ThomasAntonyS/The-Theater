import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';

const Recommendations = ({ movieId }) => {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -500 : 500;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchRecs = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/recommendations`);
                const data = await res.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecs();
    }, [movieId]);

    if (movies.length === 0) return null;

    return (
        <section className="space-y-8 relative max-w-[1400px] mx-auto px-6 md:px-12 py-16">
            <div className="flex items-center justify-between pr-4">
                <h2 className="text-3xl font-manrope font-black italic uppercase tracking-tighter border-l-4 border-red-600 pl-6 text-white">
                    You May Also Like
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-600 transition-all text-white">
                        <KeyboardArrowLeftIcon />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-600 transition-all text-white">
                        <KeyboardArrowRightIcon />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {movies.map((movie) => (
                    <Link 
                        key={movie.id} 
                        to={`/movie/${movie.id}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="min-w-[180px] md:min-w-[220px] snap-start group space-y-3"
                    >
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 bg-zinc-900">
                            {/* Vote Average Badge */}
                            {movie.vote_average > 0 && (
                                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
                                    <StarIcon sx={{ fontSize: 12 }} className="text-yellow-500" />
                                    <span className="text-[10px] font-manrope font-black text-white">
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </div>
                            )}

                            <img 
                                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt={movie.title}
                                loading="lazy"
                            />
                            
                            {/* Dark Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="text-sm font-manrope font-black uppercase tracking-wide text-white italic group-hover:text-red-600 transition-colors line-clamp-1">
                                {movie.title}
                            </h3>
                            <p className="text-[10px] font-manrope font-bold text-white/70 uppercase tracking-widest">
                                {movie.release_date?.split('-')[0] || 'N/A'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default Recommendations;