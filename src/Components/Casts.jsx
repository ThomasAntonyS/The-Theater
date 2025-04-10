import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';

function Casts({ movieId }) {
    const [casts, setCasts] = useState([]);

    const fetchCast = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`);
        const casts = await data.json();
        setCasts(casts.cast);
    };

    useEffect(() => {
        fetchCast();
    }, [movieId]);

    const baseImage = 'https://image.tmdb.org/t/p/w185';

    return (
        <>
            {casts.length > 0 ? (
                <div className='Casts mb-16'>
                    <p className='Casts_card_title text-white text-2xl sm:text-3xl md:text-4xl mx-4 sm:mx-[3%] mb-4'>
                        Characters
                    </p>
                    <div className='flex overflow-x-auto no-scrollbar space-x-4 px-4 sm:w-[95%] mx-auto'>
                        {casts.map((cast) => (
                            <div
                                className='Casts_card flex-shrink-0 text-white w-[45%] sm:w-[30%] md:w-[20%] lg:w-[13%] flex flex-col'
                                key={cast.id}
                            >
                                {cast.profile_path ? (
                                    <img
                                        src={baseImage + cast.profile_path}
                                        alt={cast.original_name}
                                        className='w-full aspect-[2/3] object-cover rounded-[10px]'
                                    />
                                ) : (
                                    <div className='w-full aspect-[2/3] bg-gray-800 flex items-center justify-center rounded-[10px]'>
                                        <PersonIcon style={{ fontSize: "4rem", color: "white" }} />
                                    </div>
                                )}

                                <p className='Casts_card_data mt-2 text-sm sm:text-base'>
                                    <i>Actor:</i> {cast.original_name}
                                </p>
                                <p className='Casts_card_data text-sm sm:text-base'>
                                    <i>Role:</i> {cast.character || "NA"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-white text-center">Loading...</p>
            )}
        </>
    );
}

export default Casts;
