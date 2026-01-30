import React, { useState, useEffect } from 'react';
import { FiArrowUpRight } from "react-icons/fi";

const MovieProviders = ({ movieId }) => {
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);

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
                console.error("Provider Error:", e);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) fetchProviders();
    }, [movieId]);

    if (!providers || (!providers.flatrate && !providers.rent && !providers.buy)) return null;

    const allProviders = [
        ...(providers.flatrate || []),
        ...(providers.rent || []),
        ...(providers.buy || [])
    ].reduce((acc, current) => {
        const x = acc.find(item => item.provider_id === current.provider_id);
        return !x ? acc.concat([current]) : acc;
    }, []);

    if (allProviders.length === 0) return null;

    return (
        <section className="relative w-full py-12 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-l-4 border-red-600 pl-6">
                <div>
                    <p className="font-manrope font-bold text-white/70 text-[10px] tracking-[0.1em] uppercase mb-1">
                        Availability
                    </p>
                    <h2 className="text-3xl md:text-5xl font-manrope font-black italic uppercase tracking-tighter text-white">
                        Where to <span className="text-red-600">Stream</span>
                    </h2>
                </div>

                {providers.link && (
                    <a
                        href={providers.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/70 hover:text-red-600 font-manrope font-black text-[10px] uppercase tracking-widest transition-all duration-300 group"
                    >
                        Detailed Info via JustWatch 
                        <FiArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                {allProviders.map((provider) => (
                    <div 
                        key={provider.provider_id} 
                        className="group relative aspect-square bg-white/[0.03] border border-white/5 rounded-2xl p-3 flex items-center justify-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 shadow-2xl"
                        title={provider.provider_name}
                    >
                        <img
                            src={baseImage + provider.logo_path}
                            alt={provider.provider_name}
                            className="w-full h-full object-contain rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20">
                            <p className="bg-white text-black text-[9px] font-manrope font-black uppercase tracking-tighter px-2 py-1 rounded-sm whitespace-nowrap shadow-xl">
                                {provider.provider_name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        </section>
    );
};

export default MovieProviders;