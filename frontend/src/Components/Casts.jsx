import React, { useState, useEffect, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Casts({ movieId }) {
    const [casts, setCasts] = useState([]);
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const baseImage = 'https://image.tmdb.org/t/p/w342'; // Higher quality for the dossier look

    const fetchCast = async () => {
        try {
            const data = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/casts`);
            const json = await data.json();
            setCasts(json.cast || []);
        } catch (error) {
            console.error('Cast Fetch Error:', error);
        }
    };

    useEffect(() => {
        if (movieId) fetchCast();
    }, [movieId]);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.7;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const checkScroll = () => {
        const el = scrollRef.current;
        if (el) {
            setAtStart(el.scrollLeft <= 10);
            setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            checkScroll();
            return () => el.removeEventListener('scroll', checkScroll);
        }
    }, [casts]);

    if (casts.length === 0) return null;

    return (
        <section className="relative w-full py-12 bg-transparent overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex items-end justify-between mb-8 border-l-4 border-red-600 pl-6">
                    <div>
                        <p className="font-manrope font-bold text-white/70 text-[10px] tracking-wide uppercase mb-1">
                            Movie Personnel
                        </p>
                        <h2 className="text-3xl md:text-5xl font-manrope font-black italic uppercase tracking-tighter text-white">
                            Lead <span className="text-red-600">Cast</span>
                        </h2>
                    </div>
                    
                    <div className="hidden md:flex gap-4 mb-1">
                        <button
                            onClick={() => scroll('left')}
                            disabled={atStart}
                            className="p-2 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all disabled:opacity-10"
                        >
                            <FiChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={atEnd}
                            className="p-2 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all disabled:opacity-10"
                        >
                            <FiChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar gap-6 pb-4 cursor-grab active:cursor-grabbing"
                >
                    {casts.map((cast) => (
                        <Link
                            key={cast.id}
                            to={`/cast/${cast.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className="group flex-shrink-0 w-40 md:w-56"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 group-hover:border-red-600 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                {cast.profile_path ? (
                                    <img
                                        src={baseImage + cast.profile_path}
                                        alt={cast.original_name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <PersonIcon className="text-white/5" style={{ fontSize: "5rem" }} />
                                    </div>
                                ) }
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                    <p className="text-[10px] font-manrope font-black text-red-600 uppercase tracking-widest mb-1">
                                        Role
                                    </p>
                                    <p className="text-white font-nunito text-xs font-bold leading-tight line-clamp-2">
                                        {cast.character || "Supporting"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-white font-manrope font-black text-sm md:text-lg uppercase italic tracking-tighter leading-none truncate group-hover:text-red-600 transition-colors">
                                    {cast.original_name}
                                </h3>
                                <div className="h-0.5 w-0 bg-red-600 mt-1 transition-all duration-500 group-hover:w-full" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Casts;