import { useState, useEffect, useRef } from 'react';
import { FiArrowUpRight, FiMinus } from "react-icons/fi";

const MovieProviders = ({ movieId }) => {
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const sectionRef = useRef(null);

    const baseImage = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/providers`);
                const data = await response.json();
                const userRegion = "IN"; 
                if (data.results && data.results[userRegion]) {
                    setProviders(data.results[userRegion]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (movieId) fetchProviders();
    }, [movieId]);

    if (!providers) return null;

    const allProviders = [
        ...(providers.flatrate || []),
        ...(providers.rent || []),
        ...(providers.buy || [])
    ].reduce((acc, current) => {
        const x = acc.find(item => item.provider_id === current.provider_id);
        return !x ? acc.concat([current]) : acc;
    }, []);

    if (allProviders.length === 0) return null;

    const limit = 5;
    const hasMore = allProviders.length > limit;
    const displayedProviders = showAll ? allProviders : allProviders.slice(0, limit);
    const remainingCount = allProviders.length - limit;

    const handleToggle = () => {
        if (showAll) {
            setShowAll(false);
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setShowAll(true);
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-16 px-6 md:px-12 max-w-[1400px] mx-auto scroll-mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-l-4 border-red-600 pl-6">
                <div>
                    <p className="font-manrope font-bold text-white/70 text-[10px] tracking-[0.1em] uppercase mb-1">Availability</p>
                    <h2 className="text-3xl md:text-5xl font-manrope font-black italic uppercase tracking-tighter text-white">
                        Where to <span className="text-red-600">Stream</span>
                    </h2>
                </div>
                {providers.link && (
                    <a href={providers.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-red-600 font-manrope text-[10px] uppercase tracking-wide transition-all duration-300 group">
                        Detailed Info <FiArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                    </a>
                )}
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 transition-all duration-700">
                {displayedProviders.map((provider, index) => (
                    <div 
                        key={provider.provider_id} 
                        style={{ transitionDelay: showAll && index > 4 ? `${(index - 5) * 50}ms` : '0ms' }}
                        className={`group relative w-16 h-16 md:w-20 md:h-20 bg-white/[0.03] border border-white/5 rounded-2xl p-2 flex items-center justify-center transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 ${showAll && index > 4 ? 'animate-in fade-in zoom-in duration-300' : ''}`}
                    >
                        <img
                            src={baseImage + provider.logo_path}
                            alt={provider.provider_name}
                            title={provider.provider_name}
                            className="w-full h-full object-contain rounded-xl transition-all duration-500"
                        />
                    </div>
                ))}

                {hasMore && (
                    <button 
                        onClick={handleToggle}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-dashed border-white/20 hover:border-red-600 hover:bg-red-600/10 transition-all flex flex-col items-center justify-center group"
                    >
                        {showAll ? (
                            <>
                                <FiMinus className="text-white group-hover:text-red-600 text-xl" />
                                <span className="text-[8px] text-white/40 uppercase font-bold tracking-tighter group-hover:text-red-600 mt-1">Less</span>
                            </>
                        ) : (
                            <>
                                <span className="text-white font-manrope font-black text-sm group-hover:text-red-600">+{remainingCount}</span>
                                <span className="text-[8px] text-white/40 uppercase font-bold tracking-tighter group-hover:text-red-600">More</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </section>
    );
};

export default MovieProviders;