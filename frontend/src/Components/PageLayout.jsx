import { useNavigate } from "react-router-dom";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import { Tailspin } from 'ldrs/react'; 
import 'ldrs/react/Tailspin.css';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const PageLayout = ({ movies, title, path, pageCount, totalPages, loading }) => {
    const navigate = useNavigate();

    const handleNavigation = (e, movieId) => {
        e.preventDefault();
        navigate(`/movie/${movieId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLeft = () => {
        navigate(`/${path}/page/${pageCount - 1}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRight = () => {
        navigate(`/${path}/page/${Number(pageCount) + 1}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const baseImage = 'https://image.tmdb.org/t/p/w342';

    return (
        <div className='flex flex-col w-full min-h-screen bg-[#050505] overflow-hidden mt-[5vh]'>
            <div className="relative py-[12vh] px-6">
                <h1 className='text-white text-6xl md:text-8xl lg:text-[10rem] text-center font-manrope font-black italic uppercase tracking-tighter leading-none opacity-20 absolute inset-0 flex items-center justify-center select-none pointer-events-none whitespace-nowrap'>
                    {title}
                </h1>
                <h2 className='text-white text-4xl md:text-6xl text-center font-manrope font-black italic uppercase tracking-tighter relative z-10'>
                    {title}
                </h2>
            </div>

            {!loading ? (
                <div className='max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 px-6 pb-20 w-full'>
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            onClick={(e) => handleNavigation(e, movie.id)}
                            className='group relative flex flex-col bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500 cursor-pointer shadow-2xl'
                        >
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-manrope font-black px-2 py-1 rounded flex items-center gap-1 z-20">
                                <StarIcon className="text-yellow-500" style={{ fontSize: '0.9rem' }} />
                                <span>{movie.vote_average?.toFixed(1)}</span>
                            </div>

                            <div className="aspect-[2/3] overflow-hidden relative">
                                {movie.poster_path ? (
                                    <img
                                        src={baseImage + movie.poster_path}
                                        alt={movie.title}
                                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1'
                                    />
                                ) : (
                                    <div className='w-full h-full flex flex-col items-center justify-center bg-zinc-900 gap-2'>
                                        <MovieCreationIcon className="text-zinc-700" style={{ fontSize: "3rem" }} />
                                        <span className="text-[10px] text-zinc-500 font-manrope font-bold tracking-widest uppercase">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                            </div>

                            <div className="absolute bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-white font-manrope font-black text-sm md:text-base leading-tight italic tracking-tighter uppercase line-clamp-2">
                                    {movie.title}
                                </p>
                                <p className="text-white/70 font-nunito text-[10px] mt-1 font-bold tracking-widest uppercase">
                                    {movie.release_date?.split('-')[0] || 'TBA'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-[60vh] flex items-center justify-center">
                    <Tailspin size={50} stroke={5} speed={0.7} color="white" />
                </div>
            )}

            {totalPages > 1 && (
                <div className='flex justify-center pb-20 pt-10'>
                    <div className='flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl'>
                        <button
                            className='w-12 h-12 flex items-center justify-center rounded-xl text-white bg-white/5 hover:bg-red-600 transition-all disabled:opacity-20 disabled:hover:bg-white/5'
                            onClick={handleLeft}
                            disabled={pageCount <= 1}
                        >
                            <ChevronLeft />
                        </button>

                        <div className="flex flex-col items-center">
                            <p className='text-white/70 font-manrope font-bold text-[10px] tracking-[0.2em] uppercase'>Page</p>
                            <p className='text-white font-manrope font-black text-lg italic'>
                                {pageCount} <span className="text-white/70 mx-1">/</span> {totalPages > 500 ? 500 : totalPages}
                            </p>
                        </div>

                        <button
                            className='w-12 h-12 flex items-center justify-center rounded-xl text-white bg-white/5 hover:bg-red-600 transition-all disabled:opacity-20 disabled:hover:bg-white/5'
                            onClick={handleRight}
                            disabled={pageCount >= totalPages}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageLayout;