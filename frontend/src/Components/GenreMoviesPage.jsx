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
    const baseImage = 'https://image.tmdb.org/t/p/w185';

    useEffect(() => {
        const fetchGenreMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${backendBaseUrl}/api/genre/movies/${genreId}/${pageCount}`);
                
                if (!res.ok) {
                    throw new Error('Failed to fetch genre movies');
                }
                
                const data = await res.json();
                
                setMovies(data.movies);
                setTotalPages(data.totalPages);
                setGenreName(data.genreName);
                
            } catch (error) {
                console.error('Error fetching genre movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenreMovies();
        window.scrollTo(0, 0);
    }, [genreId, pageCount, backendBaseUrl]);


    useEffect(() => {
        if (genreName) {
            document.title = genreName + " Movies";
        }
    }, [genreName]);

    const handlePreviousPage = () => {
        if (pageCount > 1) {
            const newPage = pageCount - 1;
            setPageCount(newPage);
            navigate(`/genre/${genreId}/page/${newPage}`);
        }
    };

    const handleNextPage = () => {
        if (pageCount < totalPages) {
            const newPage = pageCount + 1;
            setPageCount(newPage);
            navigate(`/genre/${genreId}/page/${newPage}`);
        }
    };

    // Handler for movie card navigation
    const handleMovieNavigation = (e, movieId) => {
        e.preventDefault();
        navigate(`/movie/${movieId}`);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Header />
            <div className='flex flex-col overflow-hidden w-full mx-auto px-4 mt-10'>
                <p className=' text-white text-6xl w-[90%] sm:text-9xl mx-auto my-[10vh] text-center font-manrope'>
                    {genreName ? genreName + " Movies" : ""}
                </p>
                
                {loading ? (
                    <div className="w-full h-screen mt-[10vh] flex items-start justify-center bg-black">
                        <Tailspin size={50} stroke={5} speed={0.9} color="white" />
                    </div>
                ) : (
                    <div className="flex flex-col w-full items-center mt-8">
                        {movies.length > 0 ? (
                            <div className='flex flex-wrap justify-center gap-x-6 gap-y-10 w-full px-2 md:px-6'>
                                {movies.map((movie, index) => (
                                    <div
                                        key={index}
                                        onClick={(e) => handleMovieNavigation(e, movie.id)}
                                        title={movie.title}
                                        className='relative flex flex-col w-[40%] sm:w-[30%] md:w-[20%] lg:w-[13%] h-auto overflow-hidden rounded-md hover:cursor-pointer'
                                    >
                                        <div className="absolute top-0 right-0 rounded-b-sm bg-black font-manrope bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 flex items-center gap-1 z-10">
                                            <StarIcon style={{ fontSize: '1rem' }} />
                                            <p className='h-max my-auto'>{movie.vote_average.toFixed(1)}</p>
                                        </div>

                                        {movie.poster_path ? (
                                            <img
                                                src={baseImage + movie.poster_path}
                                                alt={movie.title}
                                                className='aspect-[2/3] w-full object-cover'
                                            />
                                        ) : (
                                            <div className='aspect-[2/3] w-full flex items-center justify-center bg-gray-800 rounded-[10px]'>
                                                <MovieCreationIcon style={{ fontSize: "3rem", color: "white" }} />
                                            </div>
                                        )}
                                        <p className='absolute w-full bottom-0 backdrop-blur-md bg-black/70 px-3 py-1 text-white text-[1.1rem] text-center truncate font-nunito object-cover '>
                                            {movie.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white text-xl">No movies found for this genre.</p>
                        )}
                    </div>
                )}
                
                {totalPages > 1 && (
                    <div className='flex justify-center mt-[3vh] mb-[5vh]'>
                        <div className='flex items-center gap-6 px-4 py-2 rounded-md backdrop-blur-sm'>
                            <button
                                className='px-4 py-2 rounded-md text-white text-[20px] bg-white bg-opacity-35 disabled:opacity-40'
                                onClick={handlePreviousPage}
                                disabled={pageCount <= 1}
                            >
                                <ChevronLeft sx={{fontSize:"1.5rem"}}/>
                            </button>
                            <p className='text-white font-nunito text-[1.3rem]'>
                                {pageCount} / {totalPages}
                            </p>
                            <button
                                className='px-4 py-2 rounded-md text-white text-[20px] bg-white bg-opacity-35 disabled:opacity-40'
                                onClick={handleNextPage}
                                disabled={pageCount >= totalPages}
                            >
                                <ChevronRight sx={{fontSize:"1.5rem"}}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default GenreMoviesPage;