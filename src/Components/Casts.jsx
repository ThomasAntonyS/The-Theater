import React, { useState, useEffect, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Link, useNavigate } from 'react-router-dom';

function Casts({ movieId }) {
    const [casts, setCasts] = useState([]);
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const baseImage = 'https://image.tmdb.org/t/p/w185';

    const fetchCast = async () => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`);
            const casts = await data.json();
            setCasts(casts.cast);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCast();
    }, [movieId]);

    const handleCastNavigation = (e, id) => {
        e.preventDefault();
        navigate(`/cast/${id}`);
        window.scrollTo(0, 0);
    };

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.8;
            const newScrollLeft = direction === 'left' ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount;

            el.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });
        }
    };

    const checkScrollPosition = () => {
        const el = scrollRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 0);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();

            return () => {
                el.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, []);

    return (
        <>
            {casts.length > 0 ? (
                <div className='relative mb-16 w-[95%] sm:w-full mx-auto' data-aos="fade-right" data-aos-duration="1000" >
                    <p className='text-white text-2xl font-manrope mx-4 sm:text-3xl md:text-4xl sm:mx-[3%] mb-4'>
                        Characters
                    </p>

                    {!atStart && (
                        <button
                            onClick={() => scroll('left')}
                            className="w-max text-2xl px-3 py-2 absolute left-0 sm:left-[2.5%] border top-[45%] z-10 bg-black bg-opacity-80 text-white rounded-full hover:bg-opacity-80 transition"
                        >
                            <WestIcon />
                        </button>
                    )}
                    {!atEnd && (
                        <button
                            onClick={() => scroll('right')}
                            className="w-max text-2xl px-3 py-2 absolute right-0 sm:right-[2.5%] border top-[45%] z-10 bg-black bg-opacity-80 text-white rounded-full hover:bg-opacity-80 transition"
                        >
                            <EastIcon />
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        className='flex overflow-x-auto no-scrollbar gap-4 px-5 py-4 sm:w-[95%] mx-auto scroll-smooth'
                    >
                        {casts.map((cast) => (
                            <Link
                                onClick={(e) => handleCastNavigation(e, cast.id)}
                                key={cast.id}
                                className='flex-shrink-0 w-[45%] sm:w-[30%] md:w-[20%] lg:w-[13%] text-white rounded-xl hover:scale-105 transition-transform duration-300'
                            >
                                <div className='relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-md'>
                                    {cast.profile_path ? (
                                        <img
                                            src={baseImage + cast.profile_path}
                                            alt={cast.original_name}
                                            className='w-full h-full object-cover transition-transform duration-300 hover:brightness-90'
                                        />
                                    ) : (
                                        <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
                                            <PersonIcon style={{ fontSize: "4rem", color: "white" }} />
                                        </div>
                                    )}
                                </div>

                                <div className='mt-2 px-1'>
                                    <p className='text-sm sm:text-base font-semibold font-manrope line-clamp-1'>
                                        {cast.original_name}
                                    </p>
                                    <p className='text-sm text-gray-300 font-nunito line-clamp-1'>
                                        as {cast.character || "N/A"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-white text-center font-nunito">Loading...</p>
            )}
        </>
    );
}

export default Casts;
