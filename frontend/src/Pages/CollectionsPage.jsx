import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const baseImage = 'https://image.tmdb.org/t/p/w185';

    const backendBaseUrl = import.meta.env.VITE_API_BASE;

    const fetchCollection = async () => {
        try {
            setLoading(true);
            // Fetch from your new backend endpoint
            const res = await fetch(`${backendBaseUrl}/api/collection/${collectionId}`);
            if (!res.ok) {
                throw new Error('Failed to fetch collection data');
            }
            const data = await res.json();
            setCollection(data);
            document.title = `${data.name}`;
        } catch (error) {
            console.error('Error fetching collection:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollection();
        window.scrollTo(0, 0);
    }, []);

    const handleNavigation = (e, movieId) => {
        e.preventDefault();
        navigate(`/movie/${movieId}`);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Header />
            <main className="text-white min-h-screen bg-black pt-[10vh] px-4 pb-10">
                {collection && (
                    <section className="text-center py-8 px-2">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold my-[5vh] font-manrope">
                            {collection.name}
                        </h1>
                    </section>
                )}
                
                <section className="max-w-7xl mx-auto px-4">
                    {loading ? (
                        <div className="w-full h-[40vh] flex items-center justify-center mt-10">
                            <Tailspin size={50} stroke={5} speed={0.9} color="white" />
                        </div>
                    ) : (
                        collection && collection.parts && collection.parts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                                {collection.parts.map((movie) => (
                                    <Link
                                        key={movie.id}
                                        onClick={(e) => handleNavigation(e, movie.id)}
                                        className="relative overflow-hidden rounded-md hover:cursor-pointer transition-transform duration-300 hover:scale-105 group"
                                    >
                                        {movie.vote_average > 0 && (
                                            <div className="absolute top-0 right-0 bg-black bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 rounded-bl-md flex items-center gap-1 z-10 font-nunito">
                                                <StarIcon style={{ fontSize: '1rem' }} />
                                                <p>{Number(movie.vote_average).toFixed(1)}</p>
                                            </div>
                                        )}
                                        {movie.poster_path ? (
                                            <img
                                                src={baseImage + movie.poster_path}
                                                alt={movie.title}
                                                className="aspect-[2/3] w-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="aspect-[2/3] w-full flex items-center justify-center bg-gray-800 rounded-md">
                                                <MovieCreationIcon style={{ fontSize: '3rem', color: 'white' }} />
                                            </div>
                                        )}
                                        <p className="absolute bottom-0 w-full text-center text-white font-nunito text-[0.95rem] px-3 py-2 bg-black/60 backdrop-blur-md truncate">
                                            {movie.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-white animate-pulse my-10 font-nunito">
                                No movies found in this collection.
                            </p>
                        )
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CollectionPage;