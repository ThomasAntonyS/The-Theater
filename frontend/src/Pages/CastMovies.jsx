import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Tailspin } from 'ldrs/react';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

const CastMovies = () => {
    const { id, job } = useParams();
    const [movies, setMovies] = useState([]);
    const [name, setName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    const isDirectorMode = job === 'director';
    const baseImage = 'https://image.tmdb.org/t/p/w342';

    useEffect(() => {
        const fetchFilmography = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/person-filmography/${id}`);
                const data = await res.json();
                
                setName(data.name);
                
                let filteredList = isDirectorMode 
                    ? data.crew.filter(m => m.job === 'Director') 
                    : data.cast;

                filteredList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                
                setMovies(filteredList);
                document.title = `${data.name} — ${isDirectorMode ? 'Director' : 'Filmography'}`;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilmography();
        window.scrollTo(0, 0);
    }, [id, isDirectorMode]);

    const filteredMovies = movies.filter((movie) =>
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#050505] min-h-screen">
            <Header />
            <main className="pt-[15vh] pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                <header className="mb-16 border-l-4 border-red-600 pl-6 md:pl-10">
                    <p className="font-manrope font-bold text-white/70 text-[12px] sm:text-sm tracking-widest uppercase mb-2">
                        {isDirectorMode ? 'Visionary Director' : 'Spotlight Filmography'}
                    </p>
                    <h1 className="text-3xl md:text-8xl font-manrope font-black italic uppercase tracking-tighter text-white leading-none">
                        {name.split(" ")[0]}
                        {
                            name.split(" ").length>1?
                                <span className='text-red-600'> {name.split(" ").slice(1).join(" ")}</span>
                            :
                                null
                        }
                    </h1>
                </header>

                <div className="relative z-20 mb-16 max-w-2xl">
                    <div className="flex items-end gap-4 border-b-2 border-white/70 focus-within:border-red-600 transition-all duration-500 pb-2">
                        <SearchIcon className="text-white/70 mb-1" fontSize="medium" />
                        <input
                            type="text"
                            placeholder="FILTER FILMOGRAPHY..."
                            className="w-full bg-transparent text-xl md:text-2xl font-manrope font-bold text-white focus:outline-none placeholder:text-white/70 uppercase tracking-widest"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                    </div>
                </div>

                <section>
                    {loading ? (
                        <div className="w-full h-[40vh] flex items-center justify-center">
                            <Tailspin size={50} color="white" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                            {filteredMovies.map((movie, index) => (
                                <Link
                                    key={`${movie.id}-${index}`}
                                    to={`/movie/${movie.id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-red-600 transition-all duration-500 shadow-2xl"
                                >
                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-manrope font-black px-2 py-1 rounded z-20 flex items-center gap-1">
                                        <StarIcon className="text-yellow-500" style={{ fontSize: '0.9rem' }} />
                                        <span>{movie.vote_average ? Number(movie.vote_average).toFixed(1) : '—'}</span>
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
                                        <p className="text-white/70 font-nunito text-[10px] mt-1 font-bold tracking-widest uppercase">
                                            {isDirectorMode ? null : (movie.character ? `as ${movie.character}` : (movie.release_date?.split('-')[0] || 'N/A'))}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CastMovies;