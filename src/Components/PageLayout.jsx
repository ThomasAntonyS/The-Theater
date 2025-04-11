import { Link, useNavigate } from "react-router-dom";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const PageLayout = ({ movies, title, description }) => {

    const navigate = useNavigate();

    function handleNavigation(e, id) {
        e.preventDefault();
        navigate(`/movie/${id}`);
        window.scrollTo(0, 0);
    }

    const baseImage = 'https://image.tmdb.org/t/p/w185';

    return (
        <div className=' flex flex-col overflow-hidden w-full mx-auto px-4 mt-10'>

            <p className=' text-white text-3xl sm:text-4xl mx-auto mt-[10vh] mb-4 text-center font-manrope'>
                {title}
            </p>

            <p className=' font-nunito text-white text-base sm:text-lg md:text-xl w-full sm:w-[90%] md:w-[75%] mx-auto mb-8 text-center'>
                {description}
            </p>

            <div className=" flex flex-col w-full items-center mt-8">
                {movies ? (
                    <div className=' flex flex-wrap justify-center gap-x-6 gap-y-10 w-full px-2 md:px-6'>
                        {movies.map((movie, index) => (
                            <Link
                                key={index}
                                onClick={(e) => handleNavigation(e, movie.id)}
                                className=' relative flex flex-col items-center w-[40%] sm:w-[30%] md:w-[20%] lg:w-[13%] h-auto'
                            >
                                {movie.poster_path ? (
                                    <img
                                        src={baseImage + movie.poster_path}
                                        alt={movie.title}
                                        className='h-auto w-full object-fill rounded-[10px]'
                                    />
                                ) : (
                                    <div className='h-[180px] w-full flex items-center justify-center bg-gray-800 rounded-[10px]'>
                                        <MovieCreationIcon style={{ fontSize: "5rem", color: "white" }} />
                                    </div>
                                )}
                                <p className=' w-full text-white text-[1.1rem] text-center mt-2 truncate font-nunito'>
                                    {movie.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className='text-white text-2xl font-nunito'>Loading...</p>
                )}
            </div>

        </div>
    );
};

export default PageLayout;
