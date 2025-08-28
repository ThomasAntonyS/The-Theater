import { Link, useNavigate } from "react-router-dom";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import StarIcon from '@mui/icons-material/Star';
import { Tailspin } from 'ldrs/react'; 
import 'ldrs/react/Tailspin.css';

const PageLayout = ({ movies, title, description, pageCount, setPageCount, totalPages,loading }) => {

    const navigate = useNavigate()

    function handleNavigation(e,movieId) {
        e.preventDefault()
        navigate(`/movie/${movieId}`)
        window.scrollTo(0, 0);
    }

    const handleLeft = () => {
        setPageCount(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleRight = () => {
        if (pageCount < totalPages) {
            setPageCount(prev => prev + 1);
        }
    };

    const baseImage = 'https://image.tmdb.org/t/p/w185';

    return (
        <div className='flex flex-col overflow-hidden w-full mx-auto px-4 mt-10'>

            <p className='text-white text-3xl sm:text-4xl mx-auto mt-[10vh] mb-4 text-center font-manrope'>
                {title}
            </p>

            <p className='font-nunito text-white text-base sm:text-lg md:text-xl w-full sm:w-[90%] md:w-[75%] mx-auto mb-8 text-center'>
                {description}
            </p>

            <div className="flex flex-col w-full items-center mt-8">
                {!loading ? (
                    <div className='flex flex-wrap justify-center gap-x-6 gap-y-10 w-full px-2 md:px-6 hover:cursor-pointer'>
                        {movies.map((movie, index) => (
                            <div
                                key={index}
                                onClick={(e) => handleNavigation(e,movie.id)}
                                target="_blank"
                                className='relative flex flex-col items-center w-[40%] sm:w-[30%] md:w-[20%] lg:w-[13%] h-auto'
                            >
                                <div className="absolute top-1 right-1 bg-black font-manrope bg-opacity-70 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10">
                                    <StarIcon style={{ fontSize: '1rem' }} />
                                    <p className=' h-max my-auto'>{movie.vote_average.toFixed(1)}</p>
                                </div>

                                {movie.poster_path ? (
                                    <img
                                        src={baseImage + movie.poster_path}
                                        alt={movie.title}
                                        className='aspect-[2/3] w-full object-cover rounded-[10px]'
                                    />
                                ) : (
                                    <div className='aspect-[2/3] w-full flex items-center justify-center bg-gray-800 rounded-[10px]'>
                                        <MovieCreationIcon style={{ fontSize: "3rem", color: "white" }} />
                                    </div>
                                )}
                                <p className='w-full text-white text-[1.1rem] text-center mt-2 truncate font-nunito '>
                                    {movie.title}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-screen mt-[10vh] flex items-start justify-center bg-black">
                        <Tailspin size={50} stroke={5} speed={0.9} color="white" />
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className='flex justify-center mt-[3vh] mb-[5vh]'>
                    <div className='flex items-center gap-6 px-4 py-2 rounded-md backdrop-blur-sm'>

                        <button
                            className='px-4 py-2 rounded-md text-white text-[20px] bg-white bg-opacity-35 disabled:opacity-40'
                            onClick={handleLeft}
                            disabled={pageCount <= 1}
                        >
                            &#8592;
                        </button>

                        <p className='text-white font-nunito text-[1.3rem]'>
                            {pageCount} / {totalPages}
                        </p>

                        <button
                            className='px-4 py-2 rounded-md text-white text-[20px] bg-white bg-opacity-35 disabled:opacity-40'
                            onClick={handleRight}
                            disabled={pageCount === totalPages}
                        >
                            &#8594;
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default PageLayout;
