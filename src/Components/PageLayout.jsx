import { Link, useNavigate } from "react-router-dom"
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const PageLayout = ({movies,title,description}) => {

    const navigate = useNavigate();

    function handleNavigation(e,id){
        e.preventDefault()
        navigate(`/movie/${id}`)
        window.scrollTo(0,0)
    }

    const baseImage = 'https://image.tmdb.org/t/p/w185'

    return (
    
        <div className='MoviePage_Card flex flex-col overflow-hidden w-[100vw] mx-auto'>

            <p className=' text-white w-max text-4xl mx-auto mt-[15vh] mb-[3vh]'>{title}</p>
            <p className=' text-white w-[75%] text-1xl mx-auto mb-[7vh] text-center'>{description}</p>
    
            <div className="content flex flex-col w-max overflow-hidden mx-auto">
                {movies!=[] ? (
                <div className=' flex w-[85vw] overflow-hidden mx-auto my-3'>
                    <div className='flex flex-wrap'>
                        {movies.map((movie, index) => (
                            <Link key={index} onClick={(e)=>handleNavigation(e,movie.id)} className='Moviecard_main relative flex flex-wrap h-[50vh] w-[13vw] my-4 mx-[30px]'>
                                {
                                    (movie.poster_path != null) ?
                                    <img src={baseImage + movie.poster_path} alt={movie.title} className=' h-[65%] w-fill object-fill rounded-[10px]'/>
                                    :
                                    <p className='h-[65%] flex justify-center align-middle text-white'><MovieCreationIcon style={{fontSize:"10rem",margin:'auto'}}/></p>
                                }
                                <p className=' text-white text-[1rem] ml-1 mt-[-20px]'>{movie.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) :
                <p className=' text-white text-2xl'>Loading...</p>
            }
            </div>

        </div>
      )
    
}

export default PageLayout