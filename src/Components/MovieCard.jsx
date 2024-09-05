import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const MovieCard = ({title,url,navLink}) => {

    const [movies,setMovies] = useState([])
    const navigate = useNavigate()

    const fetchMovie = async () => {
        try {
            const data = await fetch(url);
            const movie = await data.json();
            setMovies(movie.results)
        } catch (error) {
            console.log(error);
        }
}
useEffect(() => {
    fetchMovie()
}, [])

function handleNavigation(e,id){
    e.preventDefault()
    navigate(`/movie/${id}`)
    window.scrollTo(0,0)
}

const baseImage = 'https://image.tmdb.org/t/p/w185'

  return (
    
    <div className='Card block overflow-hidden w-[95vw] mx-auto mt-8 mb-10'> 

    {(movies.length > 0) ? (
        <>
        <div className='Card_Title_nav flex flex-col relative w-[100%]'>
        <p className='Card_title text-3xl mx-3 text-white w-max h-max '>{title}</p>
        {
            (navLink)?
            <Link 
            className='Card_navigation flex align-middle absolute right-0 text-white bg-white bg-opacity-20 w-max h-max px-3 py-[.3rem] rounded-full my-auto'
            to={navLink}
            ><p className=' text-1xl h-max w-max'>See More <span className='text-[20px] my-auto'> &#8594;</span></p></Link>
            :
            null
        }
        </div>

        <div className='relative flex overflow-x-scroll overflow-y-hidden mx-6 my-3 w-[99%]'>
            <div className='flex'>
                {movies.map((movie, index) => (
                    <Link onClick={(e)=>handleNavigation(e,movie.id)} key={index} className='Moviecard_main relative flex flex-wrap h-[50vh] w-[13vw] my-4 mr-6 '>
                        {
                            (movie.poster_path != null) ?
                            <img src={baseImage + movie.poster_path} alt={movie.title} className=' h-[65%] w-fill object-fill rounded-[10px]'/>
                            :
                            <p className='h-[65%] flex justify-center align-middle text-white'><MovieCreationIcon style={{fontSize:"10rem",margin:'auto'}}/></p>
                        }
                        <p className='Movie_card_MovieTitle h-[25%] overflow-hidden flex flex-wrap text-white text-[1rem] ml-1 mt-[-20px]'>{movie.title}</p>
                        <Link to={`movie/${movie.id}`} className='absolute bottom-0 ml-1 text-slate-300 text-[.9rem] h-max w-max'>More Info<span className=' mt-[20px] text-slate-300 text-[1.3rem] h-max w-max px-1'>&#8594;</span></Link>
                    </Link>
                ))}
            </div>
        </div>
    </>
    ) :
    null
    }
    </div>
  )

}

export default MovieCard