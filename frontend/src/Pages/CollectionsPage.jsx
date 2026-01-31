import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import { Tailspin } from 'ldrs/react';
import 'ldrs/react/Tailspin.css';

const CollectionPage = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const baseImage = 'https://image.tmdb.org/t/p/w500';
    const backdropBase = 'https://image.tmdb.org/t/p/original';
    const backendBaseUrl = import.meta.env.VITE_API_BASE;

    const fetchCollection = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${backendBaseUrl}/api/collection/${collectionId}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setCollection(data);
            document.title = `${data.name} — The Theater`;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollection();
        window.scrollTo(0, 0);
    }, [collectionId]);

    return (
        <div className="bg-[#050505] min-h-screen">
            <Header />
            
            <main className="relative pb-20">
                {collection?.parts?.[0]?.backdrop_path && (
                    <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden opacity-30 pointer-events-none">
                        <img 
                            src={backdropBase + collection.parts[0].backdrop_path} 
                            className="w-full h-full object-cover blur-3xl scale-110"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
                    </div>
                )}

                <div className="relative z-10 pt-[15vh] px-6 md:px-12 max-w-[1400px] mx-auto">
                    {collection && (
                        <header className="mb-16">
                            <p className="font-manrope font-bold text-red-400 text-[10px] tracking-[0.2em] uppercase mb-4">
                                Complete Collection
                            </p>
                            <h1 className="text-5xl md:text-8xl font-manrope font-black italic uppercase tracking-tighter text-white leading-none">
                                {collection.name.split(' - ')[0]}
                            </h1>
                            <p className="font-nunito text-white/70 text-lg md:text-xl mt-4 max-w-5xl">
                                {collection.overview || `Explore the complete cinematic journey of the ${collection.name}.`}
                            </p>
                        </header>
                    )}

                    {loading ? (
                        <div className="w-full h-[40vh] flex items-center justify-center">
                            <Tailspin size={50} color="white" />
                        </div>
                    ) : (
                        <section>
                            {collection?.parts?.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                                    {collection.parts
                                        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
                                        .map((movie) => (
                                        <Link
                                            key={movie.id}
                                            to={`/movie/${movie.id}`}
                                            onClick={() => window.scrollTo(0, 0)}
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
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                                        <MovieCreationIcon className="text-zinc-700" fontSize="large" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-[#050505] to-transparent pt-10">
                                                <p className="text-white font-manrope font-black text-sm italic uppercase tracking-tighter truncate">
                                                    {movie.title}
                                                </p>
                                                <p className="text-white/70 font-nunito text-[10px] mt-1 font-bold tracking-widest uppercase">
                                                    {movie.release_date?.split('-')[0] || 'TBA'}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                !loading && (
                                    <div className="py-20 text-center border-t border-white/5">
                                        <p className="font-manrope font-bold text-white/70 text-4xl md:text-6xl uppercase italic tracking-tighter">
                                            Archive Empty
                                        </p>
                                    </div>
                                )
                            )}
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CollectionPage;