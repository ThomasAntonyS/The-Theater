import React, { useState, useEffect } from 'react';

const MovieProviders = ({ movieId }) => {
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseImage = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/providers`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const userRegion = "IN"; 
                if (data.results && data.results[userRegion]) {
                    setProviders(data.results[userRegion]);
                } else {
                    setProviders(null);
                }
            } catch (e) {
                setError(e);
                console.error("Failed to fetch movie providers:", e);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchProviders();
        }
    }, [movieId]);

    if (!providers || (!providers.flatrate && !providers.rent && !providers.buy)) {
        return null;
    }

    const allProviders = [
        ...(providers.flatrate || []),
        ...(providers.rent || []),
        ...(providers.buy || [])
    ].reduce((acc, current) => {
        const x = acc.find(item => item.provider_id === current.provider_id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    if (allProviders.length === 0) {
        return null;
    }

    return (
        <div className='relative mb-16 w-full px-4 sm:px-8 lg:px-12 mx-auto' data-aos="fade-right" data-aos-duration="1000">
            <p className='text-white text-2xl font-manrope sm:text-3xl md:text-4xl mb-6'>
                Where to Watch
            </p>

            <div className='flex overflow-x-auto py-2 gap-4'>
                {allProviders.map((provider) => (
                    <div key={provider.provider_id} className="flex-shrink-0 text-white text-center flex flex-col items-center w-24 sm:w-28">
                        <img
                            src={baseImage + provider.logo_path}
                            alt={provider.provider_name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg transform transition duration-300 hover:scale-110 border-2 border-transparent hover:border-blue-500"
                        />
                        <p className="text-xs sm:text-sm mt-2 font-nunito line-clamp-2">{provider.provider_name}</p>
                    </div>
                ))}
            </div>
            
            {providers.link && (
                <div className="mt-12 text-center sm:text-left">
                    <a
                        href={providers.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-manrope text-lg sm:text-xl inline-flex items-center group"
                    >
                        View all providers on JustWatch
                        <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            )}
        </div>
    );
};

export default MovieProviders;