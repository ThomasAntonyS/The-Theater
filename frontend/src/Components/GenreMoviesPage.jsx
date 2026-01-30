import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import { Tailspin } from 'ldrs/react'; 
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import 'ldrs/react/Tailspin.css';

const GenreMoviesPage = () => {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const backendBaseUrl = import.meta.env.VITE_API_BASE;
    const navigate = useNavigate();
    const baseImage = 'https://image.tmdb.org/t/p/w342'; // Higher res for the new grid

    useEffect(() => {
        const fetchGenreMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${backendBaseUrl}/api/genre/movies/${genreId}/${pageCount}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                
                setMovies(data.movies);
                setTotalPages(data.totalPages > 500 ? 500 : data.totalPages);
                setGenreName(data.genreName);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
        fetchGenreMovies();
    }, [genreId, pageCount, backendBaseUrl]);

    useEffect(() => {
        if (genreName) document.title = `${genreName} — The Theater`;
    }, [genreName]);

    const handlePageChange = (newPage) => {
        setPageCount(newPage);
        navigate(`/genre/${genreId}/page/${newPage}`);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Header />
            
            <main className="relative pt-[15vh] pb-20">
                <div className="absolute top-[10vh] left-0 w-full overflow-hidden pointer-events-none select-none">
                    <h1 className="text-white/[0.03] text-[10rem] md:text-[18rem] font-manrope font-black italic uppercase tracking-tighter leading-none text-center truncate">
                        {genreName}
                    </h1>
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                    <header className="mb-16 border-l-4 border-red-600 pl-6 md:pl-10">
                        <p className="font-manrope font-bold text-white/70 text-[10px] tracking-widest uppercase mb-2">
                            Browsing Category
                        </p>
                        <h2 className="text-6xl md:text-8xl font-manrope font-black italic uppercase tracking-tighter text-white leading-none">
                            {genreName} <span className="text-red-600">Films</span>
                        </h2>
                    </header>

                    {loading ? (
                        <div className="w-full h-[60vh] flex items-center justify-center">
                            <Tailspin size={50} color="white" />
                        </div>
                    ) : (
                        <>
                            {movies.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                                    {movies.map((movie) => (
                                        <Link
                                            key={movie.id}
                                            to={`/movie/${movie.id}`}
                                            className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-red-600 transition-all duration-500 shadow-2xl"
                                        >
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-manrope font-black px-2 py-1 rounded z-20 flex items-center gap-1">
                                                <StarIcon className="text-yellow-500" style={{ fontSize: '0.9rem' }} />
                                                <span>{movie.vote_average?.toFixed(1)}</span>
                                            </div>

                                            <div className="aspect-[2/3] overflow-hidden">
                                                {movie.poster_path ? (
                                                    <img
                                                        src={baseImage + movie.poster_path}
                                                        alt={movie.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                                        <MovieCreationIcon className="text-zinc-700" fontSize="large" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent pt-10">
                                                <p className="text-white font-manrope font-black text-sm italic uppercase tracking-tighter truncate">
                                                    {movie.title}
                                                </p>
                                                <p className="text-white/40 font-nunito text-[10px] mt-1 font-bold tracking-widest uppercase">
                                                    {movie.release_date?.split('-')[0] || 'TBA'}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-32 text-center">
                                    <p className="font-manrope font-bold text-white/10 text-6xl uppercase italic tracking-tighter">
                                        No Films Found
                                    </p>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="mt-20 flex justify-center">
                                    <div className="flex items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-full">
                                        <button
                                            onClick={() => handlePageChange(pageCount - 1)}
                                            disabled={pageCount <= 1}
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-600 text-white transition-all disabled:opacity-20 disabled:hover:bg-white/5"
                                        >
                                            <ChevronLeft />
                                        </button>
                                        
                                        <div className="flex flex-col items-center min-w-[80px]">
                                            <span className="text-[10px] font-manrope font-black uppercase tracking-widest text-white/30">Page</span>
                                            <span className="text-xl font-manrope font-black italic text-white">
                                                {pageCount} <span className="text-white/20 text-sm">/ {totalPages}</span>
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(pageCount + 1)}
                                            disabled={pageCount >= totalPages}
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-600 text-white transition-all disabled:opacity-20 disabled:hover:bg-white/5"
                                        >
                                            <ChevronRight />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default GenreMoviesPage;