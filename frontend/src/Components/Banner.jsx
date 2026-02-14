import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { Ping } from 'ldrs/react';
import 'ldrs/react/Ping.css';

const Banner = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [bannerMovies, setBannerMovies] = useState([]);
    const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/movies/trending`);
                const data = await response.json();
                const topMovies = data.results.slice(0, 10).map(movie => ({
                    title: movie.title || movie.name,
                    desc: movie.overview,
                    backdrop_image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                    poster_image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    link: `movie/${movie.id}`,
                    tag: movie.media_type === 'tv' ? 'Series' : 'Featured',
                }));
                setBannerMovies(topMovies);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchTrendingMovies();
    }, []);

    const handleNavigationClick = (n) => {
        if (n !== count) {
            setTimeout(() => setCount(n), 450);
        }
    };

    const nextSlide = () => handleNavigationClick(count === bannerMovies.length - 1 ? 0 : count + 1);
    const prevSlide = () => handleNavigationClick(count === 0 ? bannerMovies.length - 1 : count - 1);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => nextSlide(),
        onSwipedRight: () => prevSlide(),
        preventScrollOnSwipe: true,
        trackMouse: false
    });

    if (bannerMovies.length === 0 && loading) {
        return <div className="h-screen w-full flex items-center justify-center bg-[#050505]"><Ping size='50' color="white" /></div>;
    }

    const currentMovie = bannerMovies[count];

    return (
        <div {...swipeHandlers} className="relative h-[100dvh] sm:h-screen w-full bg-[#050505] overflow-hidden group mb-16">
            <div className={`absolute inset-0 transition-all duration-1000 transform ${currentImageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <img 
                    src={isMobile ? currentMovie.poster_image : currentMovie.backdrop_image} 
                    className="w-full h-full object-cover object-center lg:object-top" 
                    onLoad={() => {setLoading(false); setCurrentImageLoaded(true);}}
                    alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 md:via-[#050505]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hidden lg:flex"
            >
                <KeyboardArrowLeftIcon fontSize="large" />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hidden lg:flex"
            >
                <KeyboardArrowRightIcon fontSize="large" />
            </button>

            <div className="relative z-20 h-full flex flex-col justify-end lg:justify-center pb-24 lg:pb-0 px-6 md:px-12 lg:px-20 max-w-5xl">
                <div className={`space-y-4 md:space-y-6 transition-all duration-700 ${currentImageLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                    <div className="flex items-center gap-3">
                        <span className="bg-red-600 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-white font-nunito">
                            {currentMovie.tag}
                        </span>
                        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest hidden sm:block font-manrope">Trending Now</span>
                    </div>

                    <h1
                        style={{ textWrap: 'balance' }}
                        className="font-manrope font-black text-white italic uppercase tracking-tighter transition-all duration-500 break-words text-3xl sm:text-6xl leading-[1]"
                    >
                        {currentMovie.title}
                    </h1>

                    <p className="text-white/70 font-nunito text-sm md:text-lg max-w-xl leading-relaxed line-clamp-3">
                        {currentMovie.desc}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <Link to={`/${currentMovie.link}`} className="bg-white text-black p-2 sm:px-4 sm:py-3 rounded-full flex items-center gap-3 group/btn hover:bg-red-600 hover:text-white transition-all duration-500 shadow-2xl">
                            <PlayCircleOutlineRoundedIcon className="text-[40px] md:text-[54px]" />
                            <span className="font-manrope font-bold text-xs md:text-sm uppercase tracking-tighter whitespace-nowrap">More Deatails</span>
                        </Link>
                        
                        <Link to={`/${currentMovie.link}`} className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all shrink-0">
                            <InfoOutlinedIcon />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 lg:bottom-12 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-6">
                <div className="flex gap-1.5">
                    {bannerMovies.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleNavigationClick(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === count ? 'w-8 md:w-12 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
                <span className="text-white/70 font-bold font-manrope text-[10px] md:text-xs tracking-wide tabular-nums">0{count + 1} — 0{bannerMovies.length}</span>
            </div>

            <div className="absolute right-0 top-0 h-full w-12 md:w-20 lg:w-24 hidden sm:flex flex-col items-center justify-center gap-8 z-30 border-l border-white/5 bg-black/5 backdrop-blur-sm">
                <p className="rotate-90 text-white/10 font-bold font-manrope uppercase tracking-[0.5em] text-[10px] whitespace-nowrap">Featured Selection</p>
                <div className="w-[1px] h-32 bg-white/10" />
            </div>
        </div>
    );
};

export default Banner;
